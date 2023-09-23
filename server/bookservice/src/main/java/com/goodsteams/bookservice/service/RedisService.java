package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveBook(String bookId, Book book) {
        redisTemplate.opsForValue().set(bookId, book);
    }

}