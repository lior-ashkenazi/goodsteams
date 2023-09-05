package com.goodsteams.bookservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "book_genre_bridge")
@IdClass(BookGenreBridgeId.class)
public class BookGenreBridge {

    @Id
    @Column(name = "book_id")
    private Long bookId;

    @Id
    @Column(name = "genre_id")
    private Long genreId;

    @ManyToOne
    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "genre_id", insertable = false, updatable = false)
    private Genre genre;
}
