package com.goodsteams.wishlistservice.exception;

public class WishlistNotFoundException extends WishlistException {
    public WishlistNotFoundException() {
        super("Resource not found.");
    }
}
