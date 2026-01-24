package com.foodOps.request;


import lombok.Data;

@Data
public class PaymentReq {
    private  Long amount;
    private String name;
    private String email;
    private Long id;
}
