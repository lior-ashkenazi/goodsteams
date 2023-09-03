package com.goodsteams.authservice.exception;
public class UserLoginException extends RuntimeException {
    public UserLoginException(String message) {
        super(message);
    }
}
