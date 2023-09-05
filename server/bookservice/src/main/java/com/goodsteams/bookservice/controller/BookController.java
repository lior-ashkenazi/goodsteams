package com.goodsteams.bookservice.controller;

import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @GetMapping("/search")
    public Page<Book> searchBooks(
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "genre", required = false) String genreName,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        if (title != null && genreName != null) {
            return bookService.searchByTitleAndGenre(title, genreName, pageable);
        } else if (title != null) {
            return bookService.searchByTitle(title, pageable);
        } else if (genreName != null) {
            return bookService.searchByGenre(genreName, pageable);
        } else {
            return bookService.findAll(pageable);
        }
    }

}
