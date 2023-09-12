package com.goodsteams.orderservice.exception;

public class CartItemNotFoundException extends CartException{
    public CartItemNotFoundException() {
        super("Resournce not found.");
    }
}
