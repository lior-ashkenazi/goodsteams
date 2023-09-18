package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dto.OrderItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaService {

    private final KafkaTemplate<String, OrderItemDTO> kafkaTemplate;
    private final CartService cartService;

    @Autowired
    public KafkaService(KafkaTemplate<String, OrderItemDTO> kafkaTemplate, CartService cartService) {
        this.kafkaTemplate = kafkaTemplate;
        this.cartService = cartService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "order-service-group")
    public void consumeUserRegistrationEvent(String token) {
        cartService.saveCartByToken(token);
    }

    public void produceOrderPaymentEvent(List<OrderItemDTO> orderItemsDTO) {
        for (OrderItemDTO orderItemDTO : orderItemsDTO) {
            kafkaTemplate.send("order-payment-topic", orderItemDTO);
        }
    }

}