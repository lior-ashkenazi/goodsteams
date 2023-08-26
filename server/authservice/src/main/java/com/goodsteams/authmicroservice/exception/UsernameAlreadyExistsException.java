package com.goodsteams.authmicroservice.exception;

public class UsernameAlreadyExistsException extends UserRegistrationException {
    public UsernameAlreadyExistsException() {
        super("Username is already taken.");
    }
}
