package com.goodsteams.communityservice.exception;

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

    @ExceptionHandler(DiscussionException.class)
    public ResponseEntity<Map<String, String>> handleDiscussionException(DiscussionException e) {
        Map<String, String> response = Map.of("error", e.getMessage());
        HttpStatus status = e instanceof DiscussionNotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(CommentException.class)
    public ResponseEntity<Map<String, String>> handleCommentException(CommentException e) {
        Map<String, String> response = Map.of("error", e.getMessage());
        HttpStatus status = e instanceof CommentNotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception e) {
//        Map<String, String> response = Map.of("error", "An unexpected error occurred.");
        Map<String, String> response = Map.of("error", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

}