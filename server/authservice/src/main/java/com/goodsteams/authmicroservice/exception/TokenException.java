package com.goodsteams.authmicroservice.exception;

public class TokenException extends RuntimeException {
    public TokenException(String message) {
        super(message);
    }
}
