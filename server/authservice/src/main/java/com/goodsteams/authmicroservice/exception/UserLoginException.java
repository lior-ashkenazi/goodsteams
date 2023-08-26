package com.goodsteams.authmicroservice.exception;
public class UserLoginException extends RuntimeException {
    public UserLoginException(String message) {
        super(message);
    }
}
