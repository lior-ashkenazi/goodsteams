package com.goodsteams.wishlistservice.dto;

// Note that we are NOT going to construct a WishlistItem with this DTO
// Therefore the information bundled in here is satisfactory
public record FulfilledWishlistItemDTO(Long userId, Long bookId, String title, String author, String coverImageUrl) {
}
