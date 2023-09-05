package com.goodsteams.bookservice.dao;

import com.goodsteams.bookservice.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Book> findByGenres_GenreNameContainingIgnoreCase(String genreName, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCaseAndGenres_GenreNameContainingIgnoreCase(String title, String genreName, Pageable pageable);

}
