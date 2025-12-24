package com.foodOps.Exceptions;

public class CartItemException extends RuntimeException {
    public CartItemException(String message) {
        super(message);
    }
}
