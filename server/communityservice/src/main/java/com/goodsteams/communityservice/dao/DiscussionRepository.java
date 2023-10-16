package com.goodsteams.communityservice.dao;

import com.goodsteams.communityservice.entity.Discussion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    Page<Discussion> findByBookId(long bookId, Pageable pageable);

    Page<Discussion> findByBookIdAndTitleContaining(long bookId, String searchTerm, Pageable pageable);

    List<Discussion> findByBookIdOrderByUpdatedAtDesc(Long bookId, Pageable pageable);

    Long countByBookId(long bookId);
}
