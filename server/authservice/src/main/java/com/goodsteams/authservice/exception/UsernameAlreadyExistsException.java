package com.goodsteams.authservice.exception;

public class UsernameAlreadyExistsException extends UserRegistrationException {
    public UsernameAlreadyExistsException() {
        super("Username is already taken.");
    }
}
