package com.goodsteams.communityservice.exception;

public class CommentNotFoundException extends CommentException{
    public CommentNotFoundException() {
        super("Resource not found.");
    }
}
