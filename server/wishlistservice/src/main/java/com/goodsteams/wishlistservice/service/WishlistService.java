package com.goodsteams.wishlistservice.service;

import com.goodsteams.wishlistservice.dao.WishlistItemRepository;
import com.goodsteams.wishlistservice.dao.WishlistRepository;
import com.goodsteams.wishlistservice.dto.*;
import com.goodsteams.wishlistservice.entity.Wishlist;
import com.goodsteams.wishlistservice.entity.WishlistItem;
import com.goodsteams.wishlistservice.exception.InvalidTokenException;
import com.goodsteams.wishlistservice.exception.WishlistItemNotFoundException;
import com.goodsteams.wishlistservice.exception.WishlistNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class WishlistService {

    private final TokenService tokenService;
    private final RedisService redisService;
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;

    public WishlistService(
            TokenService tokenService,
            RedisService redisService,
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository
    ) {
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
    }

    public void saveWishlistByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Wishlist wishlist = new Wishlist(userId);

        wishlistRepository.save(wishlist);
    }

    public PopulatedWishlistDTO findWishlistByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Wishlist wishlist = wishlistRepository.findWishlistByUserId(userId)
                .orElseThrow(WishlistNotFoundException::new);

        return populateWishlist(wishlist);
    }

    public PopulatedWishlistDTO addWishlistItemByToken(String token, WishlistItemDTO wishlistItemDTO) {
        Wishlist wishlist = wishlistRepository.findById(wishlistItemDTO.wishlistId())
                .orElseThrow(WishlistNotFoundException::new);

        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        if (!Objects.equals(wishlist.getUserId(), userId)) {
            throw new InvalidTokenException();
        }

        WishlistItem wishlistItem = new WishlistItem(wishlist, wishlistItemDTO.bookId());

        wishlist.getWishlistItems().add(wishlistItem);
        wishlistRepository.save(wishlist);

        return populateWishlist(wishlist);
    }


    public PopulatedWishlistDTO deleteCartItemByToken(String token, Long wishlistItemId) {
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

        return populateWishlist(wishlist);
    }

    public void fulfillWishlistItem(FulfilledWishlistItemDTO fulfilledWishlistItemDTO) {
        Long userId = fulfilledWishlistItemDTO.userId();
        Long bookId = fulfilledWishlistItemDTO.bookId();

        Wishlist wishlist = wishlistRepository.findWishlistByUserId(userId)
                .orElseThrow(WishlistNotFoundException::new);

        wishlist.getWishlistItems().removeIf(wishlistItem -> bookId.equals(wishlistItem.getBookId()));

        wishlistRepository.save(wishlist);
    }

    private PopulatedWishlistDTO populateWishlist(Wishlist wishlist) {
        List<PopulatedWishlistItemDTO> populatedWishlistItemDTOs = new ArrayList<>();

        for (WishlistItem wishlistItem : wishlist.getWishlistItems()) {
            BookDTO bookData = redisService.getBook(wishlistItem.getBookId().toString());

            populatedWishlistItemDTOs.add(new PopulatedWishlistItemDTO(
                    wishlistItem.getWishlistItemId(),
                    bookData,
                    wishlistItem.getAddedDate()
            ));
        }

        return new PopulatedWishlistDTO(wishlist.getWishlistId(), wishlist.getUserId(), populatedWishlistItemDTOs);
    }

}
