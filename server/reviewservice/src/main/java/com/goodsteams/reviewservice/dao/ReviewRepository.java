package com.goodsteams.reviewservice.dao;

import com.goodsteams.reviewservice.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByBookIdAndUserId(Long bookId, Long userId);

    Page<Review> findByBookId(Long bookId, Pageable pageable);

    Page<Review> findByBookIdAndBodyTextContaining(Long bookId, String searchTerm, Pageable pageable);

    Page<Review> findByBookIdAndRating(Long bookId, Integer rating, Pageable pageable);

    Page<Review> findByBookIdAndRatingAndBodyTextContaining(Long bookId, Integer rating, String searchTerm, Pageable pageable);

    Page<Review> findByBookIdAndUserIdNot(Long bookId, Long userId, Pageable pageable);

    Page<Review> findByBookIdAndUserIdNotAndBodyTextContaining(Long bookId, Long userId, String searchTerm, Pageable pageable);

    Page<Review> findByBookIdAndUserIdNotAndRating(Long bookId, Long userId, Integer rating, Pageable pageable);

    Page<Review> findByBookIdAndUserIdNotAndRatingAndBodyTextContaining(Long bookId, Long userId, Integer rating, String searchTerm, Pageable pageable);

    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.bookId = :bookId GROUP BY r.rating")
    List<Object[]> countRatingsByBookId(@Param("bookId") Long bookId);
}
