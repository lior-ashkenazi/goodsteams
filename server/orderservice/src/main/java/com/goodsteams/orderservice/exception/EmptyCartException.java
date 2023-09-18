package com.goodsteams.orderservice.exception;

public class EmptyCartException extends CartException {
    public EmptyCartException() {
        super("Empty cart.");
    }
}
