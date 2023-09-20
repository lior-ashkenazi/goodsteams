package com.goodsteams.wishlistservice.service;

import com.goodsteams.wishlistservice.dao.WishlistItemRepository;
import com.goodsteams.wishlistservice.dao.WishlistRepository;
import com.goodsteams.wishlistservice.dto.FulfilledWishlistItemDTO;
import com.goodsteams.wishlistservice.dto.WishlistItemDTO;
import com.goodsteams.wishlistservice.entity.Wishlist;
import com.goodsteams.wishlistservice.entity.WishlistItem;
import com.goodsteams.wishlistservice.exception.InvalidTokenException;
import com.goodsteams.wishlistservice.exception.WishlistItemNotFoundException;
import com.goodsteams.wishlistservice.exception.WishlistNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class WishlistService {

    private final TokenService tokenService;
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;

    public WishlistService(
            TokenService tokenService,
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository
    ) {
        this.tokenService = tokenService;
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
    }

    public void saveWishlistByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Wishlist wishlist = new Wishlist(userId);

        wishlistRepository.save(wishlist);
    }

    public Wishlist findWishlistByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        return wishlistRepository.findWishlistByUserId(userId)
                .orElseThrow(WishlistNotFoundException::new);
    }

    public Wishlist addWishlistItemByToken(String token, WishlistItemDTO wishlistItemDTO) {
        Wishlist wishlist = wishlistRepository.findById(wishlistItemDTO.wishlistId())
                .orElseThrow(WishlistNotFoundException::new);

        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        if (!Objects.equals(wishlist.getUserId(), userId)) {
            throw new InvalidTokenException();
        }

        WishlistItem wishlistItem = new WishlistItem(
                wishlist,
                wishlistItemDTO.bookId(),
                wishlistItemDTO.title(),
                wishlistItemDTO.author(),
                wishlistItemDTO.coverImageUrl(),
                wishlistItemDTO.price(),
                wishlistItemDTO.discountPercent(),
                wishlistItemDTO.releaseDate(),
                wishlistItemDTO.averageRating()
        );

        wishlist.getWishlistItems().add(wishlistItem);
        wishlistRepository.save(wishlist);

        return wishlist;
    }


    public Wishlist deleteCartItemByToken(String token, Long wishlistItemId) {
        WishlistItem wishlistItem = wishlistItemRepository.findById(wishlistItemId)
                .orElseThrow(WishlistItemNotFoundException::new);

        Wishlist wishlist = wishlistItem.getWishlist();

        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);
        if (!Objects.equals(wishlist.getUserId(), userId)) {
            throw new InvalidTokenException();
        }

        wishlist.getWishlistItems().remove(wishlistItem);
        wishlistRepository.save(wishlist);

        return wishlist;
    }

    public void fulfillWishlistItem(FulfilledWishlistItemDTO fulfilledWishlistItemDTO) {
        Long userId = fulfilledWishlistItemDTO.userId();
        Long bookId = fulfilledWishlistItemDTO.bookId();

        Wishlist wishlist = wishlistRepository.findWishlistByUserId(userId)
                .orElseThrow(WishlistNotFoundException::new);

        wishlist.getWishlistItems().removeIf(wishlistItem -> bookId.equals(wishlistItem.getBookId()));

        wishlistRepository.save(wishlist);
    }
}
