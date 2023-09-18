package com.goodsteams.libraryservice.exception;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {
        super("Invalid token.");
    }
}
