package com.goodsteams.reviewservice.exception;

public class ReviewVoteNotFoundException extends ReviewException{
    public ReviewVoteNotFoundException() {
        super("Resource not found.");
    }
}
