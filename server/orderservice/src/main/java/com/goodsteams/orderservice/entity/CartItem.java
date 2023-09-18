package com.goodsteams.orderservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long cartItemId;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

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

    @Column(name = "added_date", updatable = false, nullable = false)
    private LocalDateTime addedDate = LocalDateTime.now();

    public CartItem() {
    }

    public CartItem(Cart cart, Long bookId, String title, String author, String coverImageUrl, BigDecimal price, Integer discountPercent) {
        this.cart = cart;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.coverImageUrl = coverImageUrl;
        this.price = price;
        this.discountPercent = discountPercent;
    }

}