package com.goodsteams.reviewservice.service;

import com.goodsteams.reviewservice.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {

    private final KafkaTemplate<String, ReviewDTO> kafkaTemplate;

    @Autowired
    public KafkaService(KafkaTemplate<String, ReviewDTO> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void produceReviewPostEvent(ReviewDTO reviewDTO) {
            kafkaTemplate.send("review-post-topic", reviewDTO);
    }

    public void produceReviewEditEvent(ReviewDTO reviewDTO) {
        // Expected previousRating field
        kafkaTemplate.send("review-edit-topic", reviewDTO);
    }

    public void produceReviewDeleteEvent(ReviewDTO reviewDTO) {
        kafkaTemplate.send("review-delete-topic", reviewDTO);
    }

}