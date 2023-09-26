package com.goodsteams.reviewservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name = "review_vote",
        uniqueConstraints = @UniqueConstraint(columnNames = {"review_id", "user_id"}))
public class ReviewVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_vote_id")
    private Long reviewVoteId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    // This field is the reason for this entity
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "vote_type", nullable = false)
    private VoteType voteType;

    public enum VoteType {
        HELPFUL,
        NOT_HELPFUL,
        FUNNY
    }

    public ReviewVote(Review review, Long userId, VoteType voteType) {
        this.review = review;
        this.userId = userId;
        this.voteType = voteType;
    }
}