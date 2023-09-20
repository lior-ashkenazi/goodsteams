package com.goodsteams.wishlistservice.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WishlistItemDTO(Long wishlistId,
                              Long bookId,
                              String title,
                              String author,
                              String coverImageUrl,
                              BigDecimal price,
                              Integer discountPercent,
                              LocalDate releaseDate,
                              BigDecimal averageRating
                              ) {
}
