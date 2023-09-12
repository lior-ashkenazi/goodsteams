package com.goodsteams.orderservice.controller;

import com.goodsteams.orderservice.entity.Cart;
import com.goodsteams.orderservice.requestmodel.CartItemDTO;
import com.goodsteams.orderservice.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
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

    @PutMapping("/")
    public Cart addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        return cartService.addCartItem(cartItemDTO);
    }

    @DeleteMapping("/{cartItemId}")
    public Cart deleteCartItem(@PathVariable Long cartItemId) {
        return cartService.deleteCartItem(cartItemId);
    }

}
