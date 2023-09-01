package com.goodsteams.authmicroservice.exception;

public class TokenExpiredException extends TokenException{
    public TokenExpiredException() {
        super("Token has expired");
    }
}
