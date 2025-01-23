package com.example.backend.controller.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/return")
public class ReturnController {
    final ReturnService service;

    //반환/회수 관리 테이블
    @GetMapping("list")
    public Map<String, Object> returnList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "state", defaultValue = "all") String state,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "COALESCE(return_approve_date, return_request_date)") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") String order
    ) {
//        System.out.println("page:" + page);
//        System.out.println("state:" + state);
//        System.out.println("type:" + type);
//        System.out.println("keyword:" + keyword);
//        System.out.println("sort:" + sort);
//        System.out.println("order:" + order);

        return service.returnList(page, state, type, keyword, sort, order);
    }

    //시리얼 번호를 통해 정보 불러오기
    @GetMapping("serialNo/{serialNo}")
    public List<Return> getSerialNo(@PathVariable String serialNo) {
//        System.out.println("controller" + serialNo);
        return service.getStandardInfo(serialNo);
    }

    //반품 요청
    @PostMapping("request")
    public void requestReturn(@RequestBody Return requestInfo) {
//        System.out.println("request: " + requestInfo);
        service.addRequest(requestInfo);
    }

    //반품 요청 정보 불러오기
    @GetMapping("approve/{returnRequestKey}")
    public List<Return> getRequest(@PathVariable String returnRequestKey) {
//        System.out.println("키값: " + returnRequestKey);
        return service.getRequestInfo(returnRequestKey);
    }


    //반품 승인 + 가입고 신청
    @PostMapping("approve")
    public ResponseEntity<Map<String, Object>> approveReturn(@RequestBody Return approveInfo) {
//        System.out.println("controller: " + approveInfo);
        if (service.addApprove(approveInfo)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "승인하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "문제가 발생하였습니다.")));
        }
    }

    //반품 반려
    @PutMapping("disapprove/{returnRequestKey}")
    public ResponseEntity<Map<String, Object>> disapproveReturn(@PathVariable String returnRequestKey) {
        if (service.disapproveReturn(returnRequestKey)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "warning",
                            "text", "반려하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "문제가 발생하였습니다.")));
        }
    }

}
