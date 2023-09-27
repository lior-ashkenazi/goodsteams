package com.goodsteams.reviewservice.exception;

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

    @ExceptionHandler(ReviewException.class)
    public ResponseEntity<Map<String, String>> handleReviewException(ReviewException e) {
        Map<String, String> response = Map.of("error", e.getMessage());
        HttpStatus status = e instanceof ReviewNotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(ReviewVoteException.class)
    public ResponseEntity<Map<String, String>> handleReviewVoteException(ReviewVoteException e) {
        Map<String, String> response = Map.of("error", e.getMessage());
        HttpStatus status = e instanceof ReviewVoteNotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception e) {
//        Map<String, String> response = Map.of("error", "An unexpected error occurred.");
        Map<String, String> response = Map.of("error", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

}