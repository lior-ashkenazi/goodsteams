package com.goodsteams.orderservice.service;

import com.goodsteams.orderservice.dao.CartItemRepository;
import com.goodsteams.orderservice.dao.CartRepository;
import com.goodsteams.orderservice.dto.BookDTO;
import com.goodsteams.orderservice.dto.PopulatedCartDTO;
import com.goodsteams.orderservice.dto.PopulatedCartItemDTO;
import com.goodsteams.orderservice.entity.Cart;
import com.goodsteams.orderservice.entity.CartItem;
import com.goodsteams.orderservice.exception.CartItemNotFoundException;
import com.goodsteams.orderservice.exception.CartNotFoundException;
import com.goodsteams.orderservice.exception.InvalidTokenException;
import com.goodsteams.orderservice.dto.CartItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final TokenService tokenService;
    private final RedisService redisService;


    @Autowired
    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       TokenService tokenService,
                       RedisService redisService
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.tokenService = tokenService;
        this.redisService = redisService;
    }

    public void saveCartByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Cart cart = new Cart(userId);

        cartRepository.save(cart);
    }

    public PopulatedCartDTO findCartByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Cart cart = cartRepository.findCartByUserId(userId)
                .orElseThrow(CartNotFoundException::new);

        return populateCart(cart);
    }

    public PopulatedCartDTO addCartItemByToken(String token, CartItemDTO cartItemDTO) {
        // Fetch the cart using cartId from CartItemDTO
        Cart cart = cartRepository.findById(cartItemDTO.cartId())
                .orElseThrow(CartNotFoundException::new);

        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);
        if (!Objects.equals(cart.getUserId(), userId)) {
            throw new InvalidTokenException();
        }

        // Create a new cart item and set the price
        CartItem cartItem = new CartItem(
                cart,
                cartItemDTO.bookId()
        );

        // Add cart item to cart and save
        cart.getCartItems().add(cartItem);  // assuming Cart has a set of CartItems
        cartRepository.save(cart);

        return populateCart(cart);

    }

    public PopulatedCartDTO deleteCartItemByToken(String token, Long cartItemId) {
        // Check if cartItem exists
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(CartItemNotFoundException::new);

        Cart cart = cartItem.getCart();

        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);
        if (!Objects.equals(cart.getUserId(), userId)) {
            throw new InvalidTokenException();
        }

        // Delete the cart item from the set of the cart
        cart.getCartItems().remove(cartItem);
        cartRepository.save(cart);

        // Fetch the updated cart and return

        return populateCart(cart);
    }

    public void clearCartByUserId(Long userId) {
        // Fetch the cart by userId
        Cart cart = cartRepository.findCartByUserId(userId)
                .orElseThrow(CartNotFoundException::new);

        // Clear the set of cart items
        cart.getCartItems().clear();

        // Save the cart which will trigger the removal of cart items from the database
        cartRepository.save(cart);

    }

    private PopulatedCartDTO populateCart(Cart cart) {
        List<PopulatedCartItemDTO> populatedCartItemDTOs = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {
            BookDTO bookData = redisService.getBook(cartItem.getBookId().toString());

            populatedCartItemDTOs.add(new PopulatedCartItemDTO(
                            cartItem.getCartItemId(),
                            bookData,
                            cartItem.getAddedDate()
                    )
            );
        }

        return new PopulatedCartDTO(cart.getCartId(), cart.getUserId(), populatedCartItemDTOs);
    }

}
