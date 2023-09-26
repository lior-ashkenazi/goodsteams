package com.goodsteams.bookservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.goodsteams.bookservice.dto.PurchasedBookDTO;
import com.goodsteams.bookservice.entity.ReviewDTO;
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

    @KafkaListener(topics = "review-post-topic", groupId = "book-service-group")
    public void consumeReviewPostEvent(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ReviewDTO reviewDTO = mapper.treeToValue(jsonNode, ReviewDTO.class);
        bookService.addBookReviewRating(reviewDTO);
    }

    @KafkaListener(topics = "review-edit-topic", groupId = "book-service-group")
    public void consumeReviewUpdateEvent(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ReviewDTO reviewDTO = mapper.treeToValue(jsonNode, ReviewDTO.class);
        // Expected previousRating field
        bookService.updateBookReviewRating(reviewDTO);
    }

    @KafkaListener(topics = "review-delete-topic", groupId = "book-service-group")
    public void consumeReview(JsonNode jsonNode) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ReviewDTO reviewDTO = mapper.treeToValue(jsonNode, ReviewDTO.class);
        bookService.subtractBookReviewRating(reviewDTO);
    }

}