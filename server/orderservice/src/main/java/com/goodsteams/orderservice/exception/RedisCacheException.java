package com.goodsteams.orderservice.exception;

public class RedisCacheException extends RuntimeException{
    public RedisCacheException() {
        super("Cache error");
    }
}
