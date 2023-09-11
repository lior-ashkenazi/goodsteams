package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.CartItemRepository;
import com.goodsteams.orderservice.dao.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }
}
