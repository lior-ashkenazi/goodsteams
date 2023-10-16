package com.goodsteams.communityservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsteams.communityservice.dto.BookDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public BookDTO getBook(String bookId) {
        Object bookObject = redisTemplate.opsForValue().get(bookId);

        return objectMapper.convertValue(bookObject, BookDTO.class);
    }

    public Set<String> getKeysByPattern(String pattern) {
        return redisTemplate.keys(pattern);
    }

}