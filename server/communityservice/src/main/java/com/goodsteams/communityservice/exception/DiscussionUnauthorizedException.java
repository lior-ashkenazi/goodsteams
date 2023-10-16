package com.goodsteams.communityservice.exception;

public class DiscussionUnauthorizedException extends DiscussionException{
    public DiscussionUnauthorizedException() {
        super("Unauthorized request.");
    }
}
