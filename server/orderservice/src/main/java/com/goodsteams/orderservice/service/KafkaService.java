package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.requestmodel.BookPriceInitializationTopicDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final RedisService redisService;
    private final CartService cartService;

    @Autowired
    public KafkaService(CartService cartService, RedisService redisService) {
        this.redisService = redisService;
        this.cartService = cartService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "order-service-group")
    public void listenForRegistration(String token) {
        cartService.saveCartByToken(token);
    }

    @KafkaListener(topics = "book-price-initialization-topic", groupId = "order-service-group")
    public void consumeBookPrice(BookPriceInitializationTopicDTO message) {
        // Cache the received price in Redis
        redisService.setBookPrice(message.bookId(), message.price());
    }
}