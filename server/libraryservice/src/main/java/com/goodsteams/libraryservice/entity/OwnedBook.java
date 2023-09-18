package com.goodsteams.libraryservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name = "owned_book", uniqueConstraints = @UniqueConstraint(columnNames = {"library_id", "book_id"}))
public class OwnedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owned_book_id")
    private Long ownedBookId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "library_id", nullable = false)
    private Library library;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(name = "cover_image_url", nullable = false)
    private String coverImageUrl;

    public OwnedBook() {}

    public OwnedBook(Library library, Long bookId, String title, String author, String coverImageUrl) {
        this.library = library;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.coverImageUrl = coverImageUrl;
    }
}