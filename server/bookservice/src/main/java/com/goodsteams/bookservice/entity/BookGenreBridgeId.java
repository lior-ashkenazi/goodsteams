package com.goodsteams.bookservice.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class BookGenreBridgeId implements Serializable {

    private Long bookId;
    private Long genreId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookGenreBridgeId that = (BookGenreBridgeId) o;

        if (!bookId.equals(that.bookId)) return false;
        return genreId.equals(that.genreId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, genreId);
    }
}
