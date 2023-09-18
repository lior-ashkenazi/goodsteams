package com.goodsteams.libraryservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "owned_book", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "book_id"}))
public class OwnedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owned_book_id")
    private Long ownedBookId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(name = "cover_image_url", nullable = false)
    private String coverImageUrl;

    public OwnedBook() {}

    public OwnedBook(Long userId, Long bookId, String title, String author, String coverImageUrl) {
        this.userId = userId;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.coverImageUrl = coverImageUrl;
    }
}