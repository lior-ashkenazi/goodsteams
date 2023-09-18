package com.goodsteams.profileservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final ProfileService profileService;

    @Autowired
    public KafkaService(ProfileService profileService) {
        this.profileService = profileService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "profile-service-group")
    public void consumeUserRegistrationEvent(String token) {
        profileService.saveProfileByToken(token);
    }
}