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
    private Long id;

    @Column(name = "title", unique = true, nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_image_url", nullable = false)
    private String coverImageUrl;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

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

    @Column(name = "review_count", nullable = false)
    private Integer reviewCount;

    @Column(name = "purchase_count", nullable = false)
    private Integer purchaseCount;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_genre_bridge",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

}