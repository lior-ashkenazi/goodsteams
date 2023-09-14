package com.goodsteams.orderservice.requestmodel;

import java.math.BigDecimal;

public record CartItemDTO(Long cartId, Long bookId, String title, String author, String coverImageUrl, BigDecimal price,
                          Integer discountPercent) {
}
