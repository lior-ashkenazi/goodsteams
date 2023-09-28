package com.goodsteams.reviewservice.exception;

public class ReviewVoteUnauthorizedException extends ReviewVoteException{
    public ReviewVoteUnauthorizedException() {
        super("Unauthorized request.");
    }
}
