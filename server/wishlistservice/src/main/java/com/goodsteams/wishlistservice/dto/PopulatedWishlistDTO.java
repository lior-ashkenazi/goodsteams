package com.goodsteams.wishlistservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class PopulatedWishlistDTO {

    private Long wishlistId;
    private Long userId;
    private List<PopulatedWishlistItemDTO> wishlistItems;

    public PopulatedWishlistDTO(Long wishlistId, Long userId, List<PopulatedWishlistItemDTO> wishlistItems) {
        this.wishlistId = wishlistId;
        this.userId = userId;
        this.wishlistItems = wishlistItems;
    }
}
