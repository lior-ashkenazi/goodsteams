package com.goodsteams.profileservice.exception;

public class ProfileNotFoundException extends ProfileException {
    public ProfileNotFoundException() {
        super("Profile was not found.");
    }
}
