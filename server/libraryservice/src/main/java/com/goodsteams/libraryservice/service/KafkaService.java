package com.goodsteams.libraryservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsteams.libraryservice.dto.OwnedBookDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final LibraryService libraryService;

    @Autowired
    public KafkaService(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @KafkaListener(topics = "order-payment-topic", groupId = "library-service-group")
    public void consumeOrderPaymentEvent(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        OwnedBookDTO ownedBookDTO = mapper.treeToValue(jsonNode, OwnedBookDTO.class);
        libraryService.saveOwnedBook(ownedBookDTO);
    }
}
