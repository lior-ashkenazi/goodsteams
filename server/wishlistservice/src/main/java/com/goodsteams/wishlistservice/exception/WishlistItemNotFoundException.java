package com.goodsteams.wishlistservice.exception;

public class WishlistItemNotFoundException extends WishlistException {
    public WishlistItemNotFoundException() {
        super("Resource not found.");
    }
}
