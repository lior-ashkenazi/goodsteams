package com.goodsteams.reviewservice.dto;

import com.goodsteams.reviewservice.entity.Review;
import com.goodsteams.reviewservice.entity.ReviewVote;

public record ReviewVoteBundledReviewDTO(Review review, ReviewVote reviewVote) {
}
