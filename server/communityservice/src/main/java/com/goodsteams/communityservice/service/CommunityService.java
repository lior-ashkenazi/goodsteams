package com.goodsteams.communityservice.service;

import com.goodsteams.communityservice.dao.CommentRepository;
import com.goodsteams.communityservice.dao.DiscussionRepository;
import com.goodsteams.communityservice.dto.BookDTO;
import com.goodsteams.communityservice.dto.CommentDTO;
import com.goodsteams.communityservice.dto.CommunityDTO;
import com.goodsteams.communityservice.dto.DiscussionDTO;
import com.goodsteams.communityservice.entity.Comment;
import com.goodsteams.communityservice.entity.Discussion;
import com.goodsteams.communityservice.exception.CommentNotFoundException;
import com.goodsteams.communityservice.exception.CommentUnauthorizedException;
import com.goodsteams.communityservice.exception.DiscussionNotFoundException;
import com.goodsteams.communityservice.exception.DiscussionUnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommunityService {

    private final TokenService tokenService;
    private final RedisService redisService;
    private final DiscussionRepository discussionRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public CommunityService(TokenService tokenService,
                            RedisService redisService,
                            DiscussionRepository discussionRepository,
                            CommentRepository commentRepository) {
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.discussionRepository = discussionRepository;
        this.commentRepository = commentRepository;
    }

    public List<CommunityDTO> getCommunitiesList(Optional<String> searchTerm, Optional<List<Long>> bookIds) {
        List<CommunityDTO> communities = new ArrayList<>();

        // Fetch book keys from Redis using the RedisService
        Set<String> bookKeys = searchTerm.isPresent() ?
                redisService.getKeysByPattern("*" + searchTerm.get() + "*") :
                redisService.getKeysByPattern("*");

        for (String key : bookKeys) {
            BookDTO book = redisService.getBook(key);

            if (bookIds.isPresent() && !bookIds.get().contains(Long.valueOf(key))) {
                continue;
            }

            CommunityDTO dto = new CommunityDTO();
            dto.setTitle(book.getTitle());
            dto.setCoverImageUrl(book.getCoverImageUrl());

            // Fetch the top 3 discussions using Pageable
            Pageable topThree = PageRequest.of(0, 3);
            List<Discussion> discussions = discussionRepository.findByBookIdOrderByUpdatedAtDesc(Long.valueOf(key), topThree);
            dto.setRecentDiscussions(discussions);

            // Set total discussion count
            Long totalDiscussions = discussionRepository.countByBookId(Long.parseLong(key));
            dto.setDiscussionCount(totalDiscussions.intValue());

            communities.add(dto);

            // If we already have 6 communities, we can break out of the loop
            if (communities.size() == 6) {
                break;
            }
        }

        return communities;
    }

    public Page<Discussion> getCommunityPageByBookId(long bookId, String searchTerm, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (searchTerm == null || searchTerm.isEmpty()) {
            return discussionRepository.findByBookId(bookId, pageable);
        } else {
            return discussionRepository.findByBookIdAndTitleContaining(bookId, searchTerm, pageable);
        }
    }

    public Page<Comment> getDiscussion(long discussionId, String searchTerm, int page, int size) {
        Discussion discussion = discussionRepository.findById(discussionId).orElseThrow(DiscussionNotFoundException::new);

        Pageable pageable = PageRequest.of(page, size);

        if (searchTerm == null || searchTerm.isEmpty()) {
            return commentRepository.findByDiscussion(discussion, pageable);
        } else {
            return commentRepository.findByDiscussionAndContentContaining(discussion, searchTerm, pageable);
        }
    }

    public Discussion saveDiscussionByToken(String token, long bookId, DiscussionDTO discussionDTO) {
        Long userId = authorizeToken(token);

        Discussion discussion = new Discussion(bookId, discussionDTO.title());

        // We persist the discussion to generate an ID for it
        discussionRepository.save(discussion);

        // In here Hibernate assigned an ID for discussion
        Comment originalPost = new Comment(
                discussion,
                userId,
                discussionDTO.content(),
                discussion.getCreatedAt(),
                discussion.getUpdatedAt()
        );

        discussion.setOriginalPost(originalPost);

        discussionRepository.save(discussion);

        return discussion;
    }

    public Discussion deleteDiscussion(String token, long discussionId) {
        Discussion discussion = discussionRepository.findById(discussionId).orElseThrow(DiscussionNotFoundException::new);

        authorizeToken(token, discussion);

        discussionRepository.delete(discussion);

        return discussion;
    }

    public Comment saveCommentByToken(String token, long discussionId, CommentDTO commentDTO) {
        Long userId = authorizeToken(token);

        Discussion discussion = discussionRepository.findById(discussionId).orElseThrow(DiscussionNotFoundException::new);

        Comment comment = new Comment(discussion, userId, commentDTO.content());

        discussion.getComments().add(comment);
        discussion.setLastPost(comment);
        discussion.setUpdatedAt(comment.getCreatedAt());

        discussionRepository.save(discussion);

        return comment;
    }

    public Comment updateCommentByToken(String token,
                                        long discussionId,
                                        long commentId,
                                        CommentDTO commentDTO) {
        discussionRepository.findById(discussionId).orElseThrow(DiscussionNotFoundException::new);

        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        authorizeToken(token, comment);

        comment.setContent(commentDTO.content());
        comment.setUpdatedAt(LocalDateTime.now());

        commentRepository.save(comment);

        return comment;
    }

    public Comment deleteCommentByToken(String token, long discussionId, long commentId) {
        Discussion discussion = discussionRepository.findById(discussionId).orElseThrow(DiscussionNotFoundException::new);

        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);

        authorizeToken(token, comment);

        discussion.getComments().remove(comment);

        discussionRepository.save(discussion);

        return comment;
    }


    private Long authorizeToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        return tokenService.extractTokenUserId(jwt);
    }

    private void authorizeToken(String token, Discussion discussion) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        if (!userId.equals(discussion.getOriginalPost().getUserId())) {
            throw new DiscussionUnauthorizedException();
        }
    }

    private void authorizeToken(String token, Comment comment) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        if (!userId.equals(comment.getUserId())) {
            throw new CommentUnauthorizedException();
        }
    }

}
