package com.goodsteams.reviewservice.exception;

public class ReviewNotFoundException extends ReviewException {
    public ReviewNotFoundException() {
        super("Resource not found.");
    }
}
