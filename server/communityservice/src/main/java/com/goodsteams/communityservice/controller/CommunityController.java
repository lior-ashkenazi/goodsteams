package com.goodsteams.communityservice.controller;

import com.goodsteams.communityservice.dto.CommentDTO;
import com.goodsteams.communityservice.dto.CommunityDTO;
import com.goodsteams.communityservice.dto.DiscussionDTO;
import com.goodsteams.communityservice.entity.Comment;
import com.goodsteams.communityservice.entity.Discussion;
import com.goodsteams.communityservice.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;

    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @GetMapping("/")
    public List<CommunityDTO> getCommunities(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) List<Long> bookid
    ) {
        return communityService.getCommunitiesList(Optional.ofNullable(search), Optional.ofNullable(bookid));
    }

    @GetMapping("/{bookId}")
    public Page<Discussion> getCommunity(
            @PathVariable String bookId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return communityService.getCommunityByBookId(Long.parseLong(bookId), search, page, size);
    }

    @GetMapping("/{bookId}/{discussionId}")
    public Page<Comment> getDiscussion(
            @PathVariable String bookId,
            @PathVariable String discussionId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return communityService.getDiscussion(Long.parseLong(discussionId), search, page, size);
    }

    @PostMapping("/{bookId}")
    public Discussion postDiscussion(
            @PathVariable String bookId,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody DiscussionDTO discussionDTO) {
        String token = authHeader.substring(7);

        return communityService.saveDiscussionByToken(token, Long.parseLong(bookId), discussionDTO);
    }

    @DeleteMapping("/{bookId}")
    public Discussion deleteDiscussion(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable String bookId,
                                       @RequestParam String discussionid) {
        String token = authHeader.substring(7);

        return communityService.deleteDiscussion(token, Long.parseLong(discussionid));
    }

    @PostMapping("/{bookId}/{discussionId}")
    public Comment postComment(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String bookId,
            @PathVariable String discussionId,
            @RequestBody CommentDTO commentDTO
            ) {
        String token = authHeader.substring(7);

        return communityService.saveCommentByToken(token, Long.parseLong(discussionId), commentDTO);
    }

    @PutMapping("/{bookId}/{discussionId}")
    public Comment editComment(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String bookId,
            @PathVariable String discussionId,
            @RequestParam String commentid,
            @RequestBody CommentDTO commentDTO
    ) {
        String token = authHeader.substring(7);

        return communityService.updateCommentByToken(
                token,
                Long.parseLong(discussionId),
                Long.parseLong(commentid),
                commentDTO);
    }

    @DeleteMapping("/{bookId}/{discussionId}")
    public Comment deleteComment(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String bookId,
            @PathVariable String discussionId,
            @RequestParam String commentid
    ) {
        String token = authHeader.substring(7);

        return communityService.deleteCommentByToken(
                token,
                Long.parseLong(discussionId),
                Long.parseLong(commentid)
        );
    }

}
