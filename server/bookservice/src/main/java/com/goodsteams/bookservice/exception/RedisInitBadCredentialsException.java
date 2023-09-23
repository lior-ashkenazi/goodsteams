package com.goodsteams.bookservice.exception;

public class RedisInitBadCredentialsException extends RuntimeException {
    public RedisInitBadCredentialsException() {
        super("Redis init bad credentials.");
    }
}
