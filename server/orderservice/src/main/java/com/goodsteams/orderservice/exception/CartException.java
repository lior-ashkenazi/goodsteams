package com.goodsteams.orderservice.exception;

public class CartException extends RuntimeException {
    public CartException(String message) {
        super(message);
    }
}
