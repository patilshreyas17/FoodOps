package com.foodOps.response;


import com.foodOps.domain.USER_ROLE;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthResponse {

    private String message;
    private String jwt;
    private USER_ROLE role;



}
