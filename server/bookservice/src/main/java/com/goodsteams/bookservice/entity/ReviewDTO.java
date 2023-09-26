package com.goodsteams.bookservice.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDTO {

    private Long userId;

    @JsonProperty(required = true)
    private Long bookId;

    @JsonProperty(required = true)
    private Integer rating;

    private Integer previousRating;

    private String bodyText;
}