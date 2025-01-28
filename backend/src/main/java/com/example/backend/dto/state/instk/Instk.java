package com.example.backend.dto.state.instk;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Instk {
    private int inputKey;
    private String inputCommonCode;
    private String inputCommonCodeName;
    private String inputNo;
    private String businessEmployeeNo;
    private boolean inputConsent;
    private String inputNote;
    private String inputStockNote;
    private String itemCommonCode;
    private String itemCommonName;
    private String customerName;
    private String itemAmount;
    private java.sql.Date requestDate;
    private java.sql.Date inputStockDate;
    private String employeeName;

    // 요청
    private String requestEmployeeNo;
    private String requestEmployeeName;
    //승인
    private String requestApprovalEmployeeNo;
    private String requestApprovalEmployeeName;
    
    //입고 승인
    private String inputStockEmployeeNo;
    private String inputStockEmployeeName;

    private List<Integer> serialList;

}
