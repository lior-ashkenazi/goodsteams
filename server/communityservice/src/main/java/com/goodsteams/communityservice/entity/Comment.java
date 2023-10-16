package com.goodsteams.communityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discussionId", insertable = false, updatable = false)
    private Discussion discussion;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String avatarUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Comment(Discussion discussion,
                   Long userId,
                   String username,
                   String avatarUrl,
                   String content) {
        this.discussion = discussion;
        this.userId = userId;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.content = content;
    }

    public Comment(Discussion discussion,
                   Long userId,
                   String username,
                   String avatarUrl,
                   String content,
                   LocalDateTime createdAt,
                   LocalDateTime updatedAt) {
        this.discussion = discussion;
        this.userId = userId;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}