package com.goodsteams.bookservice.dao;

import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.entity.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query("SELECT b FROM Book b JOIN b.genres g WHERE g.genreName = :genreName")
    Page<Book> findBooksByGenreName(@Param("genreName") String genreName, Pageable pageable);

}