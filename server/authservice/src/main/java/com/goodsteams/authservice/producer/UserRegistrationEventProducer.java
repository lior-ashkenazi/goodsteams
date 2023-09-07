package com.goodsteams.authservice.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserRegistrationEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public UserRegistrationEventProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistrationEvent(String token) {
        kafkaTemplate.send("user-registration-topic", token);
    }
}