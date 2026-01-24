package com.foodOps.payment_service.model;


import lombok.Data;

@Data
public class OrderDto {

    private  long amount;
    private String name;
    private String email;
    private Long id;
}
