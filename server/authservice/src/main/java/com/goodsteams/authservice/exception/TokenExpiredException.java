package com.goodsteams.authservice.exception;

public class TokenExpiredException extends TokenException{
    public TokenExpiredException() {
        super("Token has expired");
    }
}
