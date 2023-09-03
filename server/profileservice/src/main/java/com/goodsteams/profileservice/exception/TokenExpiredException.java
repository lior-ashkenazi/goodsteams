package com.goodsteams.profileservice.exception;

public class TokenExpiredException extends TokenException{
    public TokenExpiredException() {
        super("Token has expired");
    }
}
