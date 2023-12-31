package com.goodsteams.wishlistservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<Map<String, String>> handleTokenException(TokenException e) {
        Map<String, String> response = Map.of("error", e.getMessage());

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(WishlistException.class)
    public ResponseEntity<Map<String, String>> handleWishlistException(WishlistException e) {
        Map<String, String> response =Map.of("error", e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception e) {
//        Map<String, String> response = Map.of("error", "An unexpected error occurred.");
        Map<String, String> response = Map.of("error", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

}