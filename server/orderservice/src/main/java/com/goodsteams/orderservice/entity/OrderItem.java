package com.goodsteams.orderservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(length = 3, nullable = false, columnDefinition = "VARCHAR(3) DEFAULT 'USD'")
    private String currency = "USD";

    public OrderItem() {}

    public OrderItem(Order order, Long bookId, BigDecimal price) {
        this.order = order;
        this.bookId = bookId;
        this.price = price;
    }

}