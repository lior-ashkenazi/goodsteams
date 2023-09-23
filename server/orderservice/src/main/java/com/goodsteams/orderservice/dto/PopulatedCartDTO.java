package com.goodsteams.orderservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class PopulatedCartDTO {
    private Long cartId;
    private Long userId;
    private List<PopulatedCartItemDTO> cartItems;

    public PopulatedCartDTO(Long cartId, Long userId, List<PopulatedCartItemDTO> cartItems) {
        this.cartId = cartId;
        this.userId = userId;
        this.cartItems = cartItems;
    }
}
