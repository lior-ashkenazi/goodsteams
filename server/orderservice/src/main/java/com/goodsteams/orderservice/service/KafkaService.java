package com.goodsteams.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final CartService cartService;

    @Autowired
    public KafkaService(CartService cartService, RedisService redisService) {
        this.cartService = cartService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "order-service-group")
    public void listenForRegistration(String token) {
        cartService.saveCartByToken(token);
    }

}