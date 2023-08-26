package com.goodsteams.authmicroservice.exception;

public class UserNotFoundException extends UserLoginException{

    public UserNotFoundException(String username) {
        super("User not found with username: " + username);
    }

}
