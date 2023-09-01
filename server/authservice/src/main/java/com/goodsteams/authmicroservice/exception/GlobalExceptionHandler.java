package com.goodsteams.authmicroservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserRegistrationException.class)
    public ResponseEntity<Map<String, String>> handleUserRegistrationException(UserRegistrationException e) {
        Map<String, String> response = Map.of("message", e.getMessage());

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(UserLoginException.class)
    public ResponseEntity<Map<String, String>> handleUserLoginException(UserLoginException e) {
        Map<String, String> response = Map.of("message", e.getMessage());

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<Map<String, String>> handleTokenException(TokenException e) {
        Map<String, String> response = Map.of("message", e.getMessage());

        return ResponseEntity.badRequest().body(response);
    }

    // Handle other unexpected exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception e) {
        Map<String, String> response = Map.of("message", "An unexpected error occurred.");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}