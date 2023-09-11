package com.goodsteams.orderservice.exception;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {
        super("Invalid token.");
    }
}
