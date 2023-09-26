package com.goodsteams.reviewservice.exception;

public class ReviewUnauthorizedException extends ReviewException{
    public ReviewUnauthorizedException() {
        super("Unauthorized request.");
    }
}
