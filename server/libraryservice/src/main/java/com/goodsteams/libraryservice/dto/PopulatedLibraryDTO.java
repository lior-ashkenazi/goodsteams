package com.goodsteams.libraryservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class PopulatedLibraryDTO {
    private Long libraryId;
    private Long userId;
    private List<PopulatedOwnedBookDTO> ownedBooks;

    public PopulatedLibraryDTO(Long libraryId, Long userId, List<PopulatedOwnedBookDTO> ownedBooks) {
        this.libraryId = libraryId;
        this.userId = userId;
        this.ownedBooks = ownedBooks;
    }
}
