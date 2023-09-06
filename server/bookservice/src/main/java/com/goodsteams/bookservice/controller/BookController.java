package com.goodsteams.bookservice.controller;

import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;
    private final Map<String, String> sortMap;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
        this.sortMap = Map.ofEntries(
                Map.entry("release_date", "releaseDate"),
                Map.entry("title", "title"),
                Map.entry("price", "price"),
                Map.entry("average_rating", "averageRating")
        );
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Book>> getBooksByTitle(
            @RequestParam String term,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "title,asc") String sort) {

        String[] sortParams = sort.split(",");
        String sortOrderParam = this.sortMap.get(sortParams[0]);
        Sort sortOrder = Sort.by(sortOrderParam);
        if (sortParams[1].equalsIgnoreCase("desc")) {
            sortOrder = sortOrder.descending();
        }

        Page<Book> result = bookService.getBooksByTitleOrAuthor(term, page, size, sortOrder);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/genre/{genreName}")
    public ResponseEntity<Page<Book>> getBooksByGenre(
            @PathVariable String genreName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Book> books = bookService.getBooksByGenre(genreName, page, size);
        return ResponseEntity.ok(books);
    }

}
