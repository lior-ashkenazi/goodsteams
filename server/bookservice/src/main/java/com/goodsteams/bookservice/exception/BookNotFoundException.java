package com.goodsteams.bookservice.exception;

public class BookNotFoundException extends BookException {
    public BookNotFoundException() {
        super("Resource was not found.");
    }
}
