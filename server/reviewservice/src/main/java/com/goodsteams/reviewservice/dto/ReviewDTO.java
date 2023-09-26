package com.goodsteams.reviewservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDTO {
    private Long bookId;
    private Long userId;
    private Integer rating;
    private Integer previousRating;
    private String bodyText;

    public ReviewDTO(Long bookId, Integer rating) {
        this.bookId = bookId;
        this.rating = rating;
    }

}