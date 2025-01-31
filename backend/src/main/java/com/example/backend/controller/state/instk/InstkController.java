package com.example.backend.controller.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
import com.example.backend.service.state.instk.InstkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/instk")
public class InstkController {

    final InstkService service;

    @GetMapping("list")
    public Map<String,Object> viewlist(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "state", defaultValue = "all") String state,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "input_key") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") String order
    ) {

        Map<String,Object> returnlist = service.viewlist(state,page,keyword,sort,order);
        return returnlist;

    }

    @PostMapping("add")
    public void add(@RequestBody Instk instk) {

        System.out.println("instk = " + instk);

        service.addInstkProcess(instk);

    }

    //승인 상세
    @GetMapping("detailView/{inputKey}")
    public Instk detailView(@PathVariable int inputKey) {
        System.out.println("inputKey = " + inputKey);


//        return  new Instk();
        return service.detailView(inputKey);

    }
    //확인 상세
    @GetMapping("confirmView/{inputNo}")
    public InstkDetail confirmView(@PathVariable String inputNo , @RequestParam String inputCommonCode) {

        return service.confirmView(inputNo,inputCommonCode);

    }
    //reject
    @PutMapping("reject")
    public ResponseEntity<Map<String, Object>> rejectInstk(@RequestBody Instk instk) {
        System.out.println("instk.getInputKey() = " + instk.getInputKey());

        Boolean rejectChecked[] =  service.rejectInstk(instk.getInputKey());
        // 반려 상태 true일때
        // 0번이 , 기존 상태 ,1번이 업데이트 된 상태
        if(!rejectChecked[0] && rejectChecked[0]!=null){
            return  ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", STR."\{instk.getInputKey()} 이미 반려된 주문입니다.")));
        }
        else if(rejectChecked[1] && rejectChecked[0]==null){
            return  ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{instk.getInputKey()}번 주문 반려 되었습니다.")));
        }
        else{
            return  ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", STR."\{instk.getInputKey()}번 주문 반려 실패했습니다..")));
        }

    }


}
