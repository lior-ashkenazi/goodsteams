package com.goodsteams.orderservice.dto;

public record OrderItemDTO(Long userId, Long bookId, String title, String author, String coverImageUrl) {
}
