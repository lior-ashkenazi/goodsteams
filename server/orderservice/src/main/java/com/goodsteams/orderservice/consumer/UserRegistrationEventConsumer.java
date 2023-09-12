package com.goodsteams.orderservice.consumer;

import com.goodsteams.orderservice.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class UserRegistrationEventConsumer {

    private final CartService cartService;

    @Autowired
    public UserRegistrationEventConsumer(CartService cartService) {
        this.cartService = cartService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "order-service-group")
    public void listenForRegistration(String token) {
        cartService.saveCartByToken(token);
    }
}