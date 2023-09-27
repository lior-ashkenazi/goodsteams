package com.goodsteams.reviewservice.exception;

public class IllegalReviewException extends ReviewException{
    public IllegalReviewException() {
        super("Illegal request.");
    }
}
