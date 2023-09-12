package com.goodsteams.orderservice.exception;

public class CartNotFoundException extends CartException {
    public CartNotFoundException() {
        super("Resource not found.");
    }
}
