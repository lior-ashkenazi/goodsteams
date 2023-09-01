package com.goodsteams.authmicroservice.exception;

public class InvalidTokenFormatException extends TokenException{
    public InvalidTokenFormatException () {
        super("Invalid token format.");
    }
}
