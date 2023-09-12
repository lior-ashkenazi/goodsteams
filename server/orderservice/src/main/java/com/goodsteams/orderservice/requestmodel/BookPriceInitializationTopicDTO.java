package com.goodsteams.orderservice.requestmodel;

import java.math.BigDecimal;

public record BookPriceInitializationTopicDTO(Long bookId, BigDecimal price) {
}
