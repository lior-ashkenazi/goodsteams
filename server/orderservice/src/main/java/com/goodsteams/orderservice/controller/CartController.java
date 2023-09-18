package com.goodsteams.orderservice.controller;

import com.goodsteams.orderservice.entity.Cart;
import com.goodsteams.orderservice.dto.CartItemDTO;
import com.goodsteams.orderservice.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order/cart/")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/")
    public Cart getCart(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return cartService.findCartByToken(token);
    }

    @PostMapping("/cart-item")
    public Cart addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        return cartService.addCartItem(cartItemDTO);
    }

    @DeleteMapping("/cart-item/{cartItemId}")
    public Cart deleteCartItem(@PathVariable Long cartItemId) {
        return cartService.deleteCartItem(cartItemId);
    }

}
