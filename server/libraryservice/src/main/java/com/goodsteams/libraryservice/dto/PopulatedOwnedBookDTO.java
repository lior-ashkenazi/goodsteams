package com.goodsteams.libraryservice.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Data;

@Data
public class PopulatedOwnedBookDTO {

    private Long ownedBookId;

    @JsonUnwrapped
    private BookDTO bookData;

    public PopulatedOwnedBookDTO(Long ownedBookId, BookDTO bookData) {
        this.ownedBookId = ownedBookId;
        this.bookData = bookData;
    }
}
