package com.goodsteams.communityservice.dto;

import com.goodsteams.communityservice.entity.Comment;
import com.goodsteams.communityservice.entity.Discussion;
import org.springframework.data.domain.Page;

public record CommentsBundledDiscussionDTO(Discussion discussion, Page<Comment> comments) {
}
