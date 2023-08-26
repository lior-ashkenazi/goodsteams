package com.goodsteams.authmicroservice.exception;

public class EmailAlreadyExistsException extends UserRegistrationException {
    public EmailAlreadyExistsException() {
        super("Email is already registered.");
    }
}