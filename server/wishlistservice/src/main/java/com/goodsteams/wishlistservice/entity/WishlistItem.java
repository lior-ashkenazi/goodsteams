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

    @Column(name = "added_date", updatable = false, nullable = false)
    private LocalDateTime addedDate = LocalDateTime.now();

    // Notice the difference between LocalDate and LocalDateTime
    // both mapped to different types in MySQL
    // DATE -> LocalDate; TIMESTAMP -> LocalDateTime

    public WishlistItem() {
    }

    public WishlistItem(Wishlist wishlist,Long bookId) {
        this.wishlist = wishlist;
        this.bookId = bookId;
    }

}