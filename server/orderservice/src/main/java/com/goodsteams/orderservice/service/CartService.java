package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.CartItemRepository;
import com.goodsteams.orderservice.dao.CartRepository;
import com.goodsteams.orderservice.entity.Cart;
import com.goodsteams.orderservice.entity.CartItem;
import com.goodsteams.orderservice.exception.CartItemNotFoundException;
import com.goodsteams.orderservice.exception.CartNotFoundException;
import com.goodsteams.orderservice.exception.InvalidTokenException;
import com.goodsteams.orderservice.requestmodel.CartItemDTO;
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
    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       TokenService tokenService
    ) {
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

    public Cart addCartItem(CartItemDTO cartItemDTO) {
        // Fetch the cart using cartId from CartItemDTO
        Cart cart = cartRepository.findById(cartItemDTO.cartId())
                .orElseThrow(CartNotFoundException::new);


        // Create a new cart item and set the price
        CartItem cartItem = new CartItem(
                cart,
                cartItemDTO.bookId(),
                cartItemDTO.title(),
                cartItemDTO.author(),
                cartItemDTO.coverImageUrl(),
                cartItemDTO.price(),
                cartItemDTO.discountPercent()
        );

        // Add cart item to cart and save
        cart.getCartItems().add(cartItem);  // assuming Cart has a set of CartItems
        cartRepository.save(cart);

        return cart;

    }

    public Cart deleteCartItem(Long cartItemId) {
        // Check if cartItem exists
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(CartItemNotFoundException::new);

        Cart cart = cartItem.getCart();

        // Delete the cart item from the set of the cart
        cart.getCartItems().remove(cartItem);
        cartRepository.save(cart);

        // Actually delete the cartItem from the database
        cartItemRepository.delete(cartItem);

        // Fetch the updated cart and return
        return cart;
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
