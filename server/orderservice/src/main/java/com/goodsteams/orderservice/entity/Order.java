package com.goodsteams.orderservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "Order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @JsonIgnore
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "order_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column(name = "total_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @Column(length = 3, nullable = false, columnDefinition = "VARCHAR(3) DEFAULT 'USD'")
    private String currency;

    @Column(length = 50, nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'Pending'")
    private String status;

}