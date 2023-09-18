package com.goodsteams.libraryservice.dto;

public record OwnedBookDTO(Long userId, Long bookId, String title, String author, String coverImageUrl) {
}
