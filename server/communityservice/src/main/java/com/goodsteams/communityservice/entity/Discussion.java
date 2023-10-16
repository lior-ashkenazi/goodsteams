package com.goodsteams.communityservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "discussion")
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discussionId;

    @Column(nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "original_post_id", referencedColumnName = "commentId")
    private Comment originalPost;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "last_post_id", referencedColumnName = "commentId")
    private Comment lastPost;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

    public Discussion(Long bookId, String title) {
        this.bookId = bookId;
        this.title = title;
    }

}