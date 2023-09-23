package com.goodsteams.wishlistservice.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PopulatedWishlistItemDTO {

    private Long wishlistItemId;

    @JsonUnwrapped
    private BookDTO bookData;

    private LocalDateTime addedDate;

    public PopulatedWishlistItemDTO(Long wishlistItemId, BookDTO bookData, LocalDateTime addedDate) {
        this.wishlistItemId = wishlistItemId;
        this.bookData = bookData;
        this.addedDate = addedDate;
    }
}
