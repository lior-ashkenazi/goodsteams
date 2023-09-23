package com.goodsteams.wishlistservice.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long bookId;
    private String title;
    private String author;
    private String coverImageUrl;
    private BigDecimal price;
    private String currency;
    private Integer discountPercent;
    private LocalDate releaseDate;
    private BigDecimal averageRating;
    private Integer purchaseCount;
}