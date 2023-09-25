package com.goodsteams.bookservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsteams.bookservice.dto.PurchasedBookDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final BookService bookService;

    @Autowired
    public KafkaService(BookService bookService) {
        this.bookService = bookService;
    }

    @KafkaListener(topics = "order-payment-topic", groupId = "book-service-group")
    public void consumeOrderPaymentEvent(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        PurchasedBookDTO purchasedBookDTO = mapper.treeToValue(jsonNode, PurchasedBookDTO.class);
        bookService.updateBookPurchase(purchasedBookDTO);
    }

}