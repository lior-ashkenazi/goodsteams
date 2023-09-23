package com.goodsteams.orderservice.controller;

import com.goodsteams.orderservice.dto.PopulatedCartDTO;
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
    public PopulatedCartDTO getCart(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return cartService.findCartByToken(token);
    }

    @PostMapping("/cart-item")
    public PopulatedCartDTO addCartItem(@RequestHeader("Authorization") String authHeader, @RequestBody CartItemDTO cartItemDTO) {
        String token = authHeader.substring(7);

        return cartService.addCartItemByToken(token, cartItemDTO);
    }

    @DeleteMapping("/cart-item/{cartItemId}")
    public PopulatedCartDTO deleteCartItem(@RequestHeader("Authorization") String authHeader, @PathVariable Long cartItemId) {
        String token = authHeader.substring(7);

        return cartService.deleteCartItemByToken(token, cartItemId);
    }

}
