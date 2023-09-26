package com.goodsteams.reviewservice.dto;

import com.goodsteams.reviewservice.entity.ReviewVote;

public record ReviewVoteDTO(Long userId, ReviewVote.VoteType voteType) {
}
