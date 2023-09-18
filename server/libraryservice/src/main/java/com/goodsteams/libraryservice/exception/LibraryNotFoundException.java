package com.goodsteams.libraryservice.exception;

public class LibraryNotFoundException extends LibraryException{
    public LibraryNotFoundException() {
        super("Resource not found.");
    }
}
