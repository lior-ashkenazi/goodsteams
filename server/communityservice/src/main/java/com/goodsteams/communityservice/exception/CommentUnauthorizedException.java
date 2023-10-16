package com.goodsteams.communityservice.exception;

public class CommentUnauthorizedException extends CommentException{
    public CommentUnauthorizedException() {
        super("Unauthorized request.");
    }
}
