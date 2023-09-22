package com.goodsteams.wishlistservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "wishlist_item")
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_item_id")
    private Long wishlistItemId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "wishlist_id", nullable = false)
    private Wishlist wishlist;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(name = "cover_image_url", nullable = false)
    private String coverImageUrl;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(length = 3, nullable = false, columnDefinition = "VARCHAR(3) DEFAULT 'USD'")
    private String currency = "USD";

    @Column(name = "discount_percent", nullable = false)
    private Integer discountPercent;

    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @Column(name = "average_rating", nullable = false)
    private BigDecimal averageRating;

    @Column(name = "purchase_count", nullable = false)
    private Integer purchaseCount;

    @Column(name = "added_date", updatable = false, nullable = false)
    private LocalDateTime addedDate = LocalDateTime.now();

    // Notice the difference between LocalDate and LocalDateTime
    // both mapped to different types in MySQL
    // DATE -> LocalDate; TIMESTAMP -> LocalDateTime

    public WishlistItem() {
    }

    public WishlistItem(
            Wishlist wishlist,
            Long bookId,
            String title,
            String author,
            String coverImageUrl,
            BigDecimal price,
            Integer discountPercent,
            LocalDate releaseDate,
            BigDecimal averageRating,
            Integer purchaseCount
    ) {
        this.wishlist = wishlist;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.coverImageUrl = coverImageUrl;
        this.price = price;
        this.discountPercent = discountPercent;
        this.releaseDate = releaseDate;
        this.averageRating = averageRating;
        this.purchaseCount = purchaseCount;
    }

}