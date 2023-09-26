package com.goodsteams.reviewservice.dao;

import com.goodsteams.reviewservice.entity.Review;
import com.goodsteams.reviewservice.entity.ReviewVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewVoteRepository extends JpaRepository<ReviewVote, Long> {
    Optional<ReviewVote> findReviewVoteByReviewAndUserId(Review review, Long userId);
}
