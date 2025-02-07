package com.example.backend.service.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.dto.stock.stocktaking.StocktakingItem;
import com.example.backend.mapper.standard.item.ItemMapper;
import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StocktakingService {

    final StocktakingMapper mapper;
    final ItemMapper itemMapper;


    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order, Authentication auth) {
        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

        String workplaceCode = mapper.getWorkplaceCode(auth.getName());
        String workplace = workplaceCode.substring(0, 3);

        return Map.of("list", mapper.list(searchType, searchKeyword, pageList, sort, order, workplaceCode, workplace), "count", mapper.count(searchType, searchKeyword, workplaceCode, workplace));
    }

    // camelCase를 snake_case로 변환하는 로직
    private String toSnakeCase(String camelCase) {
        if (camelCase == null || camelCase.isEmpty()) {
            return camelCase; // null 이거나 빈 문자열은 그대로 반환
        }
        return camelCase
                .replaceAll("([a-z])([A-Z])", "$1_$2") // 소문자 뒤 대문자에 언더스코어 추가
                .toLowerCase(); // 전체를 소문자로 변환
    }

    // type 값에 따라 해당하는 SQL 필드명으로 변경
    private String resolveType(String type) {
        if (type == null || type.isEmpty() || type.equals("all")) {
            return null;
        }
        switch (type) {
            case "stocktaking_key":
                return "s.stocktaking_key";
            case "item_common_name":
                return "itcm.common_code_name";
            case "customer_name":
                return "cus.customer_name";
            case "count_current":
                return "s.count_current";
            case "count_configuration":
                return "s.count_configuration";
            case "count_difference":
                return "s.count_difference";
            case "warehouse_name":
                return "w.warehouse_name";
            case "stocktaking_type":
                return "s.stocktaking_type";
            case "customer_employee_name":
                return "emp.employee_name";
            case "stocktaking_date":
                return "s.stocktaking_date";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Stocktaking view(Integer stocktakingKey) {
        return mapper.view(stocktakingKey);
    }

    public Boolean add(Stocktaking stocktaking) {
        stocktaking.setStocktakingDate(LocalDateTime.now());


        return mapper.add(stocktaking) == 1;
    }

    public List<Stocktaking> getStocktakingWarehouseList(Authentication auth) {

        String workplaceCode = mapper.getWorkplaceCode(auth.getName());
        String workplace = workplaceCode.substring(0, 3);

        return mapper.getStocktakingWarehouseList(workplaceCode, workplace);


    }

    public List<Stocktaking> getStocktakingItemList(String warehouseCode) {

        return mapper.getStocktakingItemList(warehouseCode);
    }

    public Boolean validate(Stocktaking stocktaking, Authentication auth) {
        stocktaking.setCustomerEmployeeNo(auth.getName());


        return
                !(
                        stocktaking.getWarehouseCode() == null || stocktaking.getWarehouseCode().trim().isEmpty() ||
                                stocktaking.getItemCode() == null || stocktaking.getItemCode().trim().isEmpty() ||
                                stocktaking.getCountCurrent() == null ||
                                stocktaking.getCountConfiguration() == null ||
                                stocktaking.getStocktakingType() == null ||
                                stocktaking.getCustomerEmployeeNo() == null || stocktaking.getCustomerEmployeeNo().trim().isEmpty());
    }

    // 권한 확인
    public Boolean checkAccess(String warehouseCode, Authentication auth) {


        String employeeNo = auth.getName();


        String workType = employeeNo.substring(0, 3);

        Integer access = mapper.checkAccess(warehouseCode, workType, employeeNo);

        return access == 1;
    }

    public Integer getStocktakingCountCurrent(String warehouseCode) {

        Integer countCurrent = mapper.getAllLocated(warehouseCode);

        return countCurrent;
    }

    public Set<String> getWarehouseRowList(String warehouseCode) {

        return mapper.getWarehouseRowList(warehouseCode);

    }

    public Set<String> getWarehouseColList(String warehouseCode, String row) {

        return mapper.getWarehouseColList(warehouseCode, row);

    }

    public Set<Integer> getWarehouseShelfList(String warehouseCode, String row, String col) {

        return mapper.getWarehouseShelfList(warehouseCode, row, col);


    }

    public Integer getStocktakingLocationList(String warehouseCode, String row, String col, Integer shelf) {


        return mapper.getStocktakingLocation(warehouseCode, row, col, shelf);

    }

    public String getLocationValue(Integer locationKey) {
        return mapper.getLocationValue(locationKey);
    }

    // 반영할 때 정보 모두 썼는지, 잘 입력 됐는지
    public Boolean validateUpdate(StocktakingItem stocktakingItem) {

        return
                !(
                        stocktakingItem.getWarehouseCode() == null || stocktakingItem.getWarehouseCode().trim().isEmpty() ||
                                stocktakingItem.getItemCode() == null || stocktakingItem.getItemCode().trim().isEmpty() ||
                                stocktakingItem.getSerialNo() == null || stocktakingItem.getSerialNo().trim().isEmpty() ||
                                stocktakingItem.getPutStocktakingType() == null || stocktakingItem.getPutStocktakingType().trim().isEmpty() ||
                                stocktakingItem.getMakeDifference() == null || stocktakingItem.getMakeDifference().trim().isEmpty() ||
                                stocktakingItem.getLocationKey() == null ||
                                stocktakingItem.getRow() == null || stocktakingItem.getRow().trim().isEmpty() ||
                                stocktakingItem.getCol() == null || stocktakingItem.getCol().trim().isEmpty() ||
                                stocktakingItem.getShelf() == null
                );
    }

    public Boolean updateLocation(StocktakingItem stocktakingItem) {

        System.out.println(stocktakingItem);


        if (stocktakingItem.getPutStocktakingType().equals("new")) {
//            // 품목 상세에서 시리얼 넘버 최대값 가져오기
//            Integer maxSerialNo = itemMapper.viewMaxSerialNoByItemCode(stocktakingItem.getItemCode());
//
//            // 시리얼 번호 생성 (20자리)
//            String insertSerialNo = "S" + String.format("%05d", (maxSerialNo == null) ? 1 : maxSerialNo + 1);
//
//            stocktakingItem.setSerialNo(insertSerialNo);
//
//            System.out.println(stocktakingItem.getSerialNo());
//            // item_sub 테이블에 추가
//            int insertItemSub = itemMapper.addItemSub(stocktakingItem.getItemCode(), insertSerialNo, "WHS");
//
//            int insertInstkSub = mapper.addInstkSub(stocktakingItem.getSerialNo(), stocktakingItem.getLocationKey());
//            해당 로케이션 위치를 재고여부 활성화로 변경
//            물품입출내역에 실사 입고


            return 1 == 1;

        } else if (stocktakingItem.getPutStocktakingType().equals("old")) {
//            UPDATE 로 ITEMSUB 의 current_common_code WHS로 바꾸기
//            해당 로케이션 위치를 재고여부 활성화로 변경
//            물품입출내역에 실사 입고
//
            return 1 == 1;
        } else {
//            실사 분실인 상태
//            current_common_code를 LOS 상태로 변경
//            해당 로케이션 위치를 비활성화로 변경
//            물품입출내역에 실사 분실
            return 1 == 1;

        }
//        mapper.updateStockStatus(stocktakingItem);
    }


//    로케이션 정보 불러오기.
//    public List<Integer> getStocktakingLocationList(String warehouseCode, String difference) {
//
//        Integer getCode;
//
//        if (difference.equals("1")) {
////            전산수량이 많을 경우 > 물품을 삭제해야 함 > located = true 불러옴
//            getCode = 1;
//            return mapper.getStocktakingLocationList(warehouseCode, getCode);
//        } else {
////            실제수량이 많을 경우
//            getCode = 0;
//            return mapper.getStocktakingLocationList(warehouseCode, getCode);
//        }
//
//    }
}
