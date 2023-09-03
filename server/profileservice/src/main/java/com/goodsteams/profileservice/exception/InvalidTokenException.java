package com.goodsteams.profileservice.exception;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {
        super("Invalid token.");
    }
}
