package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.CartItemRepository;
import com.goodsteams.orderservice.dao.CartRepository;
import com.goodsteams.orderservice.entity.Cart;
import com.goodsteams.orderservice.exception.CartNotFoundException;
import com.goodsteams.orderservice.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final TokenService tokenService;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, TokenService tokenService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.tokenService = tokenService;
    }

    public void saveCartByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = extractTokenUserId(jwt);

        Cart cart = new Cart(userId);

        cartRepository.save(cart);
    }

    public Cart findCartByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = extractTokenUserId(jwt);

        Optional<Cart> existingCart = cartRepository.findCartByUserId(userId);

        if (existingCart.isEmpty()) {
            throw new CartNotFoundException();
        }

        return existingCart.get();

    }

    private Long extractTokenUserId(Jwt jwt) {
        String userIdStr = jwt.getClaimAsString("userId");
        Long userId = null;

        try {
            userId = Long.parseLong(userIdStr);
        } catch (Exception e) {
            throw new InvalidTokenException();
        }

        return userId;
    }

}
