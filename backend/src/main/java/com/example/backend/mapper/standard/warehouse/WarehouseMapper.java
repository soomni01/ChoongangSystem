package com.example.backend.mapper.standard.warehouse;

import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.warehouse.Warehouse;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface WarehouseMapper {

    //    customer_code를 customer 이름으로 변경
    @Select("""
            <script>
            SELECT w.warehouse_name,
                   w.warehouse_key,
                   w.warehouse_state,
                   w.warehouse_city,
                   w.warehouse_tel,
                   cus.customer_name,
                   e.employee_name,
                   w.warehouse_active,
                   w.warehouse_tel
            FROM TB_WHMST w
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_EMPMST e ON w.customer_employee_no=e.employee_no
            WHERE 
                <if test="active == false"> w.warehouse_active = 1</if> <!-- 체크박스 해지한 경우 TRUE인것만 보여주기 -->
                <if test="active == true">1=1</if> <!-- 체크박스 체크한 경우 전체 보여주기 -->
                <if test="searchType == 'all'">
                AND(
                    w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_state LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_city LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_tel LIKE CONCAT('%',#{searchKeyword},'%')
                )
                </if>
                <if test="searchType != 'all'">
                 <choose>
                     <when test="searchType == 'warehouse'">
                    AND(
                         w.warehouse_name LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')   
                        )
                     </when>
                     <when test="searchType == 'customer'">
                    AND(
                         w.customer_code LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                        )
                     </when>
                     <when test="searchType == 'employee'">
                    AND(
                         w.customer_employee_no LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                        )
                     </when>
                     <when test="searchType == 'warehouseState'">
                    AND(
                         w.warehouse_state LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <when test="searchType == 'warehouseCity'">
                    AND(
                         w.warehouse_city LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <when test="searchType == 'warehouseTel'">
                    AND(
                         w.warehouse_tel LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <otherwise>
                       AND  ${searchType} LIKE CONCAT('%', #{searchKeyword}, '%')
                     </otherwise>
                 </choose>
                 </if>
            ORDER BY 
                 <if test="sort != null and sort != ''">
                    ${sort} ${order}
                </if>
                <if test="sort == null">
                   w.warehouse_code DESC
                </if>
            LIMIT #{pageList},10    
            </script>
            """)
    List<Warehouse> list(String searchType, String searchKeyword, Integer pageList, String sort, String order, Boolean active);

    @Select("""
            SELECT 
                w.warehouse_name,
                w.warehouse_code,
                cus.customer_name,
                w.customer_code,
                w.warehouse_tel,
                e.employee_name,
                w.customer_employee_no,
                w.warehouse_state,
                w.warehouse_city,
                w.warehouse_address,
                w.warehouse_post,
                w.warehouse_address_detail,
                w.warehouse_note,
                w.warehouse_active
            FROM TB_WHMST w 
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_EMPMST e ON w.customer_employee_no=e.employee_no
            WHERE warehouse_key=#{warehouseKey}
            """)
    Warehouse viewWarehouse(Integer warehouseKey);

    @Update("""
            UPDATE TB_WHMST
            SET warehouse_name=#{warehouseName},
                customer_code=#{customerCode},
                warehouse_address=#{warehouseAddress},
                warehouse_address_detail=#{warehouseAddressDetail},
                warehouse_post=#{warehousePost},
                warehouse_state=#{warehouseState},
                warehouse_city=#{warehouseCity},
                customer_employee_no=#{customerEmployeeNo},
                warehouse_tel=#{warehouseTel},
                warehouse_active=#{warehouseActive},
                warehouse_note=#{warehouseNote}
            WHERE warehouse_key=#{warehouseKey}
            """)
    int edit(Warehouse warehouse);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_WHMST w
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_EMPMST e ON w.customer_employee_no=e.employee_no
            WHERE 
                <if test="active == false"> w.warehouse_active = 1</if> <!-- 체크박스 해지한 경우 TRUE인것만 보여주기 -->
                <if test="active == true">1=1</if> <!-- 체크박스 체크한 경우 전체 보여주기 -->
                <if test="searchType == 'all'">
                AND(
                    w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_state LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_city LIKE CONCAT('%',#{searchKeyword},'%')
                )
                </if>
                <if test="searchType != 'all'">
                 <choose>
                     <when test="searchType == 'warehouse'">
                    AND(
                         w.warehouse_name LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')   
                        )
                     </when>
                     <when test="searchType == 'customer'">
                    AND(
                         w.customer_code LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                        )
                     </when>
                     <when test="searchType == 'employee'">
                    AND(
                         w.customer_employee_no LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                        )
                     </when>
                     <when test="searchType == 'warehouseState'">
                    AND(
                         w.warehouse_state LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <when test="searchType == 'warehouseCity'">
                    AND(
                         w.warehouse_city LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <when test="searchType == 'warehouseTel'">
                    AND(
                         w.warehouse_tel LIKE CONCAT('%', #{searchKeyword}, '%')
                         )
                     </when>
                     <otherwise>
                       AND  ${searchType} LIKE CONCAT('%', #{searchKeyword}, '%')
                     </otherwise>
                 </choose>
                 </if>
            </script>
            
            """)
    Integer countAllWarehouse(String searchType, String searchKeyword, Boolean active);

    @Select("""
            SELECT COUNT(*)
            FROM TB_WHMST
            WHERE warehouse_address=#{warehouseAddress} AND warehouse_address_detail=#{warehouseAddressDetail}
            """)
    Integer checkWarehouse(String warehouseAddress, String warehouseAddressDetail);

    //창고 코드 최대값
    @Select("""
                <script>
               SELECT COALESCE(MAX(CAST(SUBSTRING(warehouse_code, 4) AS UNSIGNED)), 0) AS maxNumber
                FROM TB_WHMST
                WHERE warehouse_code LIKE CONCAT('WHS', '%')
                AND warehouse_code REGEXP '^[A-Za-z]+[0-9]+$'
                </script>
            """)
    Integer viewMaxWarehouseCode();

    @Insert("""
            INSERT INTO TB_WHMST
            (warehouse_code, 
             warehouse_name,
             customer_code,
             warehouse_address,
             warehouse_address_detail,
             warehouse_post,
             warehouse_state,
             warehouse_city,
             customer_employee_no,
             warehouse_tel,
             warehouse_active,
             warehouse_note)
            VALUES
            (#{warehouseCode},
             #{warehouseName},
             #{customerCode},
             #{warehouseAddress},
             #{warehouseAddressDetail},
             #{warehousePost},
             #{warehouseState},
             #{warehouseCity},
             #{customerEmployeeNo},
             #{warehouseTel},
             #{warehouseActive},
             #{warehouseNote})
            """)
    int addWarehouse(Warehouse warehouse);

    @Select("""
            SELECT * FROM TB_CUSTMST c\s
            LEFT JOIN TB_WHMST w\s
            ON c.customer_code = w.customer_code\s
            WHERE w.warehouse_code IS NULL AND c.customer_active = 1
            
            UNION
            
            SELECT * FROM TB_CUSTMST c\s
            RIGHT JOIN TB_WHMST w\s
            ON c.customer_code = w.customer_code\s
            WHERE w.warehouse_code IS NULL AND c.customer_active = 1;
            """)
    List<Customer> getWarehouseCustomerList();

    @Select("""
            SELECT employee_no customerEmployeeNo, employee_name employeeName
            FROM TB_EMPMST
            WHERE employee_workplace_code=#{customerCode}
            """)
    List<Warehouse> getWarehouseEmployeeList(String customerCode);

    //    창고의 사용여부가 변경되었는지 확인
    @Select("""
            SELECT warehouse_active
            FROM TB_WHMST
            WHERE warehouse_code=#{warehouseCode}
            """)
    Boolean checkChangeActive(String warehouseCode);

    //협력사 코드로 창고 사용여부 수정
    @Update("""
            UPDATE TB_WHMST
            SET warehouse_active = #{customerActive}
            WHERE customer_code = #{customerCode}
            """)
    int editWarehouseActive(Customer customer);

    @Select("""
            SELECT warehouse_code
            FROM TB_WHMST
            WHERE customer_code = #{customerCode}
            """)
    String getWarehouseCode(String customerCode);
}
