package com.goodsteams.bookservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long bookId;

    @Column(unique = true, nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String synopsis;

    @Column(name = "cover_image_url", nullable = false)
    private String coverImageUrl;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 3, nullable = false, columnDefinition = "VARCHAR(3) DEFAULT 'USD'")
    private String currency;

    @Column(name = "discount_percent", nullable = false)
    private Integer discountPercent;

    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "page_count", nullable = false)
    private Integer pageCount;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "ISBN", unique = true, nullable = false)
    private String isbn;

    @Column(name = "average_rating", nullable = false)
    private BigDecimal averageRating;

    @Column(name = "rating_count", nullable = false)
    private Integer ratingCount;

    @Column(name = "purchase_count", nullable = false)
    private Integer purchaseCount;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "book_genre_bridge",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

}
