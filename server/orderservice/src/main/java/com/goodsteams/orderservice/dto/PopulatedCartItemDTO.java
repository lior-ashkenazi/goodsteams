package com.goodsteams.orderservice.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PopulatedCartItemDTO {

    private Long cartItemId;

    @JsonUnwrapped
    private BookDTO bookData;

    private LocalDateTime addedDate;

    public PopulatedCartItemDTO(Long cartItemId, BookDTO bookData, LocalDateTime addedDate) {
        this.cartItemId = cartItemId;
        this.bookData = bookData;
        this.addedDate = addedDate;
    }
}