package com.goodsteams.communityservice.dao;

import com.goodsteams.communityservice.entity.Comment;
import com.goodsteams.communityservice.entity.Discussion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByDiscussion(Discussion discussion, Pageable pageable);

    Page<Comment> findByDiscussionAndContentContaining(Discussion discussion, String content, Pageable pageable);
}
