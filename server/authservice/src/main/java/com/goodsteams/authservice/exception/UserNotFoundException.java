package com.goodsteams.authservice.exception;

public class UserNotFoundException extends UserLoginException{

    public UserNotFoundException(String username) {
        super("Username " + username + " was not found.");
    }

}
