package com.goodsteams.reviewservice.controller;

import com.goodsteams.reviewservice.dto.ReviewDTO;
import com.goodsteams.reviewservice.dto.ReviewVoteBundledReviewDTO;
import com.goodsteams.reviewservice.dto.ReviewVoteDTO;
import com.goodsteams.reviewservice.entity.Review;
import com.goodsteams.reviewservice.entity.ReviewVote;
import com.goodsteams.reviewservice.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Page<?>> getReviews(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable String bookId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String sort
    ) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Page<ReviewVoteBundledReviewDTO> reviewVoteBundledReviewDTOs = reviewService
                    .getReviewsByBookAndByToken(token, Long.parseLong(bookId), search, page, size, sort);
            return ResponseEntity.ok(reviewVoteBundledReviewDTOs);
        }

        Page<Review> reviews = reviewService.getReviewsByBook(Long.parseLong(bookId), search, page, size, sort);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{bookId}/starcounts")
    public Map<Integer, Long> getStarCounts(@PathVariable String bookId) {
        return reviewService.getStarCounts(Long.parseLong(bookId));
    }

    @PostMapping("/{bookId}")
    public Review postReview(@RequestHeader("Authorization") String authHeader,
                             @PathVariable String bookId,
                             @RequestBody ReviewDTO reviewDTO) {
        String token = authHeader.substring(7);
        reviewDTO.setBookId(Long.parseLong(bookId));

        return reviewService.saveReviewByToken(token, reviewDTO);
    }

    @PutMapping("/{bookId}")
    public Review updateReview(@RequestHeader("Authorization") String authHeader,
                               @PathVariable String bookId,
                               @RequestBody ReviewDTO reviewDTO) {
        String token = authHeader.substring(7);
        reviewDTO.setBookId(Long.parseLong(bookId));

        return reviewService.updateReviewByToken(token, reviewDTO);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<String> deleteReview(@RequestHeader("Authorization") String authHeader,
                                               @PathVariable String bookId) {
        String token = authHeader.substring(7);

        reviewService.deleteReviewByToken(token, Long.parseLong(bookId));

        return ResponseEntity.ok("Resource was deleted.");
    }

    @PostMapping("/{bookId}/{reviewId}/vote")
    public ReviewVote addReviewVote(@PathVariable String reviewId, @RequestBody ReviewVoteDTO reviewVoteDTO) {
        return reviewService.saveReviewVote(Long.parseLong(reviewId), reviewVoteDTO);
    }

    @PutMapping("/{bookId}/{reviewId}/vote")
    public ReviewVote changeReviewVote(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable String reviewId,
                                       @RequestBody ReviewVoteDTO reviewVoteDTO) {
        String token = authHeader.substring(7);

        return reviewService.changeReviewVote(token, Long.parseLong(reviewId), reviewVoteDTO);
    }

    @DeleteMapping("/{bookId}/{reviewId}/vote")
    public ReviewVote deleteReviewVote(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable String reviewId,
                                       @RequestBody ReviewVoteDTO reviewVoteDTO) {
        String token = authHeader.substring(7);

        return reviewService.deleteReviewVote(token, Long.parseLong(reviewId), reviewVoteDTO);
    }

}