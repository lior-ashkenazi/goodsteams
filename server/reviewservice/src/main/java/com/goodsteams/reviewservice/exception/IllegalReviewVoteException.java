package com.goodsteams.reviewservice.exception;

public class IllegalReviewVoteException extends ReviewVoteException{
    public IllegalReviewVoteException() {
        super("Illegal request.");
    }
}
