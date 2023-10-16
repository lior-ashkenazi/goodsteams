package com.goodsteams.communityservice.exception;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {
        super("Invalid token.");
    }
}
