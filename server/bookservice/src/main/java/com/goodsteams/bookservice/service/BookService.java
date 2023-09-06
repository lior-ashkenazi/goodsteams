package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.entity.Genre;
import com.goodsteams.bookservice.exception.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book findById(Long id) {
        Optional<Book> book = bookRepository.findById(id);

        if (book.isEmpty()) {
            throw new BookNotFoundException();
        }

        return book.get();
    }

    public Page<Book> searchBooksByTitle(String title, int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookRepository.findByTitleContainingIgnoreCase(title, pageable);
    }

    public Page<Book> getBooksByGenre(String genreName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findBooksByGenreName(genreName, pageable);
    }

}
