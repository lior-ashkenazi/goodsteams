package com.goodsteams.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    public BigDecimal getBookPrice(Long bookId) {
        String key = "BOOK_PRICE_" + bookId;
        Object priceObj = redisTemplate.opsForValue().get(key);

        if (priceObj != null) {
            return new BigDecimal(priceObj.toString());
        }
        return null;
    }
}