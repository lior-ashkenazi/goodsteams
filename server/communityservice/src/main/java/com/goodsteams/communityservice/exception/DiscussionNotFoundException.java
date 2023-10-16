package com.goodsteams.communityservice.exception;

public class DiscussionNotFoundException extends DiscussionException{
    public DiscussionNotFoundException() {
        super("Resource not found.");
    }
}
