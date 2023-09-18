package com.goodsteams.wishlistservice.exception;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {
        super("Invalid token.");
    }
}
