package com.goodsteams.reviewservice.service;

import com.goodsteams.reviewservice.dao.ReviewRepository;
import com.goodsteams.reviewservice.dao.ReviewVoteRepository;
import com.goodsteams.reviewservice.dto.ReviewDTO;
import com.goodsteams.reviewservice.dto.ReviewVoteBundledReviewDTO;
import com.goodsteams.reviewservice.dto.ReviewVoteDTO;
import com.goodsteams.reviewservice.entity.Review;
import com.goodsteams.reviewservice.entity.ReviewVote;
import com.goodsteams.reviewservice.exception.ReviewNotFoundException;
import com.goodsteams.reviewservice.exception.ReviewUnauthorizedException;
import com.goodsteams.reviewservice.exception.ReviewVoteNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    private final TokenService tokenService;
    private final ReviewRepository reviewRepository;
    private final ReviewVoteRepository reviewVoteRepository;
    private final KafkaService kafkaService;

    @Autowired
    public ReviewService(TokenService tokenService,
                         ReviewRepository reviewRepository,
                         ReviewVoteRepository reviewVoteRepository,
                         KafkaService kafkaService) {
        this.tokenService = tokenService;
        this.reviewRepository = reviewRepository;
        this.reviewVoteRepository = reviewVoteRepository;
        this.kafkaService = kafkaService;
    }

    public Page<Review> getReviewsByBook(Long bookId, String searchTerm, int page, int size, String sortParam) {
        Sort sort = getSort(sortParam);

        Pageable pageable = PageRequest.of(page, size, sort);

        if (searchTerm == null || searchTerm.isEmpty()) {
            return reviewRepository.findByBookId(bookId, pageable);
        } else {
            return reviewRepository.findByBookIdAndBodyTextContaining(bookId, searchTerm, pageable);
        }
    }

    public Page<ReviewVoteBundledReviewDTO> getReviewsByBookAndByToken(String token,
                                                                       Long bookId,
                                                                       String searchTerm,
                                                                       int page,
                                                                       int size,
                                                                       String sortParam) {
        Long userId = authorizeToken(token);

        Sort sort = getSort(sortParam);

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Review> reviews;
        if (searchTerm == null || searchTerm.isEmpty()) {
            reviews = reviewRepository.findByBookId(bookId, pageable);
        } else {
            reviews = reviewRepository.findByBookIdAndBodyTextContaining(bookId, searchTerm, pageable);
        }

        reviewRepository.findByBookId(bookId, pageable);

        List<ReviewVoteBundledReviewDTO> reviewVoteBundledReviewDTOs = new ArrayList<>();
        for (Review review : reviews) {
            ReviewVote reviewVote = reviewVoteRepository.findReviewVoteByReviewAndUserId(review, userId).orElse(null);
            ReviewVoteBundledReviewDTO reviewVoteBundledReviewDTO = new ReviewVoteBundledReviewDTO(review, reviewVote);
            reviewVoteBundledReviewDTOs.add(reviewVoteBundledReviewDTO);
        }

        return new PageImpl<>(reviewVoteBundledReviewDTOs, pageable, reviews.getTotalElements());
    }

    public Map<Integer, Long> getStarCounts(Long bookId) {
        List<Object[]> counts = reviewRepository.countRatingsByBookId(bookId);
        Map<Integer, Long> starCounts = new HashMap<>();

        // Initialize the map with default values
        for (int i = 0; i <= 5; i++) {
            starCounts.put(i, 0L);
        }

        // Update the counts from the database
        for (Object[] count : counts) {
            starCounts.put((Integer) count[0], (Long) count[1]);
        }

        return starCounts;
    }

    // Should we in future edition be more secure
    // and ask the order service to authenticate
    // that the requester is an owner of that book
    public Review saveReviewByToken(String token, ReviewDTO reviewDTO) {
        authorizeToken(token, reviewDTO);

        Review review = new Review(
                reviewDTO.getBookId(),
                reviewDTO.getUserId(),
                reviewDTO.getRating(),
                reviewDTO.getBodyText());

        reviewRepository.save(review);
        kafkaService.produceReviewPostEvent(reviewDTO);

        return review;
    }

    public Review updateReviewByToken(String token, ReviewDTO reviewDTO) {
        Long userId = authorizeToken(token, reviewDTO);
        Long bookId = reviewDTO.getBookId();

        Review review = reviewRepository.findByBookIdAndUserId(bookId, userId)
                .orElseThrow(ReviewNotFoundException::new);

        reviewDTO.setPreviousRating(review.getRating());

        review.setRating(reviewDTO.getRating());
        review.setBodyText(reviewDTO.getBodyText());
        review.setHelpfulCount(0);
        review.setNotHelpfulCount(0);
        review.setFunnyCount(0);
        review.setUpdatedAt(LocalDateTime.now());

        // This will delete the review votes records
        // what where associated with the review
        // before the update
        review.getReviewVotes().clear();

        reviewRepository.save(review);
        kafkaService.produceReviewEditEvent(reviewDTO);

        return review;
    }

    public void deleteReviewByToken(String token, Long bookId) {
        Long userId = authorizeToken(token);

        // We ensure that the user has a review on the book
        Review review = reviewRepository.findByBookIdAndUserId(bookId, userId)
                .orElseThrow(ReviewNotFoundException::new);

        reviewRepository.deleteById(review.getReviewId());
        kafkaService.produceReviewDeleteEvent(new ReviewDTO(bookId, review.getRating()));
    }

    public ReviewVote saveReviewVote(Long reviewId, ReviewVoteDTO reviewVoteDTO) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        ReviewVote reviewVote = new ReviewVote(review, reviewVoteDTO.userId(), reviewVoteDTO.voteType());
        review.getReviewVotes().add(reviewVote);

        reviewRepository.save(review);

        return reviewVote;
    }

    public ReviewVote changeReviewVote(String token, Long reviewId, ReviewVoteDTO reviewVoteDTO) {
        authorizeToken(token);

        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        ReviewVote reviewVote = reviewVoteRepository
                .findReviewVoteByReviewAndUserId(review, reviewVoteDTO.userId())
                .orElseThrow(ReviewVoteNotFoundException::new);

        ReviewVote.VoteType oldReviewVoteType = reviewVote.getVoteType();
        ReviewVote.VoteType newReviewVoteType = reviewVoteDTO.voteType();

        switch (newReviewVoteType) {
            case HELPFUL -> reviewVote.setVoteType(ReviewVote.VoteType.HELPFUL);
            case NOT_HELPFUL -> reviewVote.setVoteType(ReviewVote.VoteType.NOT_HELPFUL);
            case FUNNY -> reviewVote.setVoteType(ReviewVote.VoteType.FUNNY);
        }

        switch (oldReviewVoteType) {
            case HELPFUL -> review.setHelpfulCount(review.getHelpfulCount() - 1);
            case NOT_HELPFUL -> review.setNotHelpfulCount(review.getNotHelpfulCount() - 1);
            case FUNNY -> review.setFunnyCount(review.getFunnyCount() - 1);
        }

        reviewVote.setVoteType(newReviewVoteType);

        reviewVoteRepository.save(reviewVote);
        reviewRepository.save(review);

        return reviewVote;
    }

    public ReviewVote deleteReviewVote(String token, Long reviewId, ReviewVoteDTO reviewVoteDTO) {
        authorizeToken(token);

        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        ReviewVote reviewVote = reviewVoteRepository
                .findReviewVoteByReviewAndUserId(review, reviewVoteDTO.userId())
                .orElseThrow(ReviewVoteNotFoundException::new);

        ReviewVote.VoteType reviewVoteType = reviewVote.getVoteType();

        switch (reviewVoteType) {
            case HELPFUL -> review.setHelpfulCount(review.getHelpfulCount() - 1);
            case NOT_HELPFUL -> review.setNotHelpfulCount(review.getNotHelpfulCount() - 1);
            case FUNNY -> review.setFunnyCount(review.getFunnyCount() - 1);
        }

        review.getReviewVotes().remove(reviewVote);
        reviewRepository.save(review);

        return reviewVote;
    }

    private Long authorizeToken(String token, ReviewDTO reviewDTO) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        if (!userId.equals(reviewDTO.getUserId())) {
            throw new ReviewUnauthorizedException();
        }

        return userId;
    }

    private Long authorizeToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        return tokenService.extractTokenUserId(jwt);
    }

    private Sort getSort(String sortString) {
        return switch (sortString) {
            case "popular" -> Sort.by("helpfulCount").descending().and(Sort.by("funnyCount").descending());
            case "newest" -> Sort.by("createdAt").descending();
            case "oldest" -> Sort.by("createdAt").ascending();
            default -> Sort.by("helpfulCount").descending().and(Sort.by("funnyCount").descending());
        };
    }

}
