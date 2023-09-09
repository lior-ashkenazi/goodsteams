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
                Map.entry("release-date", "releaseDate"),
                Map.entry("name", "name"),
                Map.entry("price", "price"),
                Map.entry("average-rating", "averageRating")
        );
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Book>> getBooksByTitle(
            @RequestParam String term,
            @RequestParam(defaultValue = "title") String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,asc") String sort) {

        String[] sortParams = sort.split(",");
        String sortOrderParam = this.sortMap.get(sortParams[0]);
        if (sortOrderParam.equals("name")) {
            if (type.equals("title")) {
                sortOrderParam = "title";
            } else if(type.equals("author")) {
                sortOrderParam = "author";
            }
        }
        Sort sortOrder = Sort.by(sortOrderParam);

        if (sortParams[1].equalsIgnoreCase("desc")) {
            sortOrder = sortOrder.descending();
        }

        Page<Book> result;
        if (type.equals("title")) {
            result = bookService.getBooksByTitle(term, page, size, sortOrder);
        } else {
            result = bookService.getBooksByAuthor(term, page, size, sortOrder);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/genre/{genreName}")
    public ResponseEntity<Page<Book>> getBooksByGenre(
            @PathVariable String genreName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {

        Page<Book> books = bookService.getBooksByGenre(genreName, page, size);
        return ResponseEntity.ok(books);
    }

}
