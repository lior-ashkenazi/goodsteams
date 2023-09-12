package com.goodsteams.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RedisService {

    private static final String INITIAL_LOAD_KEY = "INITIAL_LOAD_DONE";

    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean isInitialLoadDone() {
        return Boolean.TRUE.equals(redisTemplate.hasKey(INITIAL_LOAD_KEY));
    }

    public void markInitialLoadDone() {
        redisTemplate.opsForValue().set(INITIAL_LOAD_KEY, true);
    }

    public void setBookPrice(Long bookId, BigDecimal price) {
        // Store book prices with a prefix for clarity and organization
        String key = "BOOK_PRICE_" + bookId;

        // Here we're always setting the price. If you only want to set it once,
        // you can first check if it exists using redisTemplate.hasKey(key).
        redisTemplate.opsForValue().set(key, price);
    }

    public BigDecimal getBookPrice(Long bookId) {
        String key = "BOOK_PRICE_" + bookId;
        return (BigDecimal) redisTemplate.opsForValue().get(key);
    }
}