package com.goodsteams.authservice.exception;

public class EmailAlreadyExistsException extends UserRegistrationException {
    public EmailAlreadyExistsException() {
        super("Email is already registered.");
    }
}