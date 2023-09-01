package com.goodsteams.authmicroservice.exception;

public class BadCredentialsException extends UserLoginException {
    public BadCredentialsException() {
        super("Password is incorrect.");
    }
}
