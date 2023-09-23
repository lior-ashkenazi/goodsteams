package com.goodsteams.bookservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookException.class)
    public ResponseEntity<Map<String, String>> handleBookException(BookException e) {
        Map<String, String> response = Map.of("error", e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RedisInitBadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBookException(RedisInitBadCredentialsException e) {
        Map<String, String> response = Map.of("error", e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception e) {
//        Map<String, String> response = Map.of("error", "An unexpected error occurred.");
        Map<String, String> response = Map.of("error", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}