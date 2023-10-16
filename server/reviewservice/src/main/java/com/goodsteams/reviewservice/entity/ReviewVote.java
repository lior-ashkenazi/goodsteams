package com.goodsteams.reviewservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "review_vote",
        uniqueConstraints = @UniqueConstraint(columnNames = {"review_id", "user_id"}))
public class ReviewVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_vote_id")
    private Long reviewVoteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    // This field is the reason for this entity
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "vote_type", nullable = false)
    private VoteType voteType;

    public enum VoteType {
        helpful,
        not_helpful,
        funny
    }

    public ReviewVote() {
    }

    public ReviewVote(Review review, Long userId, VoteType voteType) {
        this.review = review;
        this.userId = userId;
        this.voteType = voteType;
    }
}