package com.goodsteams.reviewservice.exception;

public class ReviewVoteNotFoundException extends ReviewVoteException{
    public ReviewVoteNotFoundException() {
        super("Resource not found.");
    }
}
