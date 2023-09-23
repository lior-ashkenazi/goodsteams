package com.goodsteams.wishlistservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsteams.wishlistservice.dto.FulfilledWishlistItemDTO;
import com.goodsteams.wishlistservice.dto.WishlistItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final WishlistService wishlistService;

    @Autowired
    public KafkaService(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @KafkaListener(topics = "user-registration-topic", groupId = "wishlist-service-group", containerFactory = "stringKafkaListenerContainerFactory")
    public void consumeUserRegistrationEvent(String token) {
        wishlistService.saveWishlistByToken(token);
    }


    @KafkaListener(topics = "order-payment-topic", groupId = "wishlist-service-group", containerFactory = "jsonKafkaListenerContainerFactory")
    public void consumeOrderPaymentEvent(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        FulfilledWishlistItemDTO fulfilledWishlistItemDTO = mapper.treeToValue(jsonNode, FulfilledWishlistItemDTO.class);
        wishlistService.fulfillWishlistItem(fulfilledWishlistItemDTO);
    }

}