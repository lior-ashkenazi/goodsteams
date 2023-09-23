package com.goodsteams.wishlistservice.controller;

import com.goodsteams.wishlistservice.dto.PopulatedWishlistDTO;
import com.goodsteams.wishlistservice.dto.WishlistItemDTO;
import com.goodsteams.wishlistservice.entity.Wishlist;
import com.goodsteams.wishlistservice.service.WishlistService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/")
    public PopulatedWishlistDTO getWishlist(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return wishlistService.findWishlistByToken(token);
    }

    @PostMapping("/wishlist-item")
    public PopulatedWishlistDTO addWishlistItem(@RequestHeader("Authorization") String authHeader,
                                    @RequestBody WishlistItemDTO wishlistItemDTO) {
        String token = authHeader.substring(7);

        return wishlistService.addWishlistItemByToken(token, wishlistItemDTO);
    }

    @DeleteMapping("/wishlist-item/{wishlistItemId}")
    public PopulatedWishlistDTO deleteWishlistItem(@RequestHeader("Authorization") String authHeader,
                                       @PathVariable Long wishlistItemId) {
        String token = authHeader.substring(7);

        return wishlistService.deleteCartItemByToken(token, wishlistItemId);
    }

}
