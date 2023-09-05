package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService (BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public Page<Book> searchByTitle(String title, Pageable pageable) {
        return bookRepository.findByTitleContainingIgnoreCase(title, pageable);
    }

    public Page<Book> searchByGenre(String genreName, Pageable pageable) {
        return bookRepository.findByGenres_GenreNameContainingIgnoreCase(genreName, pageable);
    }

    public Page<Book> searchByTitleAndGenre(String title, String genreName, Pageable pageable) {
        return bookRepository.findByTitleContainingIgnoreCaseAndGenres_GenreNameContainingIgnoreCase(title, genreName, pageable);
    }

    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

}
