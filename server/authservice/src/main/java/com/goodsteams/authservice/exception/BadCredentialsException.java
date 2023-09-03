package com.goodsteams.authservice.exception;

public class BadCredentialsException extends UserLoginException {
    public BadCredentialsException() {
        super("Password is incorrect.");
    }
}
