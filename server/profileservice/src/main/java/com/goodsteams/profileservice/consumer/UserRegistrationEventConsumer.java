package com.goodsteams.profileservice.consumer;

import com.goodsteams.profileservice.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
@Service
public class UserRegistrationEventConsumer {

    private final ProfileService profileService;

    @Autowired
    public UserRegistrationEventConsumer(ProfileService profileService) {
        this.profileService = profileService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "profile-service-group")
    public void listenForRegistration(String token) {
        profileService.saveProfileByToken(token);
    }
}