package com.goodsteams.orderservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();

    @Column(name = "total_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @Column(length = 3, nullable = false, columnDefinition = "VARCHAR(3) DEFAULT 'USD'")
    private String currency = "USD";

    @Column(length = 50, nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'Pending'")
    private String status = "Successful";

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>();

    public Order() {}

    public Order(Long userId, BigDecimal totalPrice) {
        this.userId = userId;
        this.totalPrice = totalPrice;
    }

}