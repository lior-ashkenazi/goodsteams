package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.dto.PurchasedBookDTO;
import com.goodsteams.bookservice.dto.RedisInitCredentialsDTO;
import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.exception.BookNotFoundException;
import com.goodsteams.bookservice.exception.RedisInitBadCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private final RedisService redisService;

    @Value("${redis.init.username}")
    private String redisInitUsername;

    @Value("${redis.init.password}")
    private String redisInitPassword;

    @Autowired
    public BookService(BookRepository bookRepository, RedisService redisService) {
        this.bookRepository = bookRepository;
        this.redisService = redisService;
    }

    public Book findById(Long id) {
        Optional<Book> book = bookRepository.findById(id);

        if (book.isEmpty()) {
            throw new BookNotFoundException();
        }

        return book.get();
    }

    public Page<Book> getBooksByTitle(String title, int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookRepository.findByTitleContainingIgnoreCase(title, pageable);
    }

    public Page<Book> getBooksByAuthor(String author, int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookRepository.findByAuthorContainingIgnoreCase(author, pageable);
    }

    public Page<Book> getBooksByGenre(String genreName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findBooksByGenreName(genreName, pageable);
    }

    public void initializeRedis(RedisInitCredentialsDTO redisInitCredentialsDTO) {
        String username = redisInitCredentialsDTO.username();
        String password = redisInitCredentialsDTO.password();

        if (!redisInitUsername.equals(username) || !redisInitPassword.equals(password)) {
            throw new RedisInitBadCredentialsException();
        }

        List<Book> books = bookRepository.findAll();

        for (Book book : books) {
            redisService.saveBook(book.getBookId().toString(), book);
        }

    }

    public void updateBookPurchase(PurchasedBookDTO purchasedBookDTO) {
        Long bookId = purchasedBookDTO.bookId();

        Book book = bookRepository.findById(bookId).orElseThrow(BookNotFoundException::new);

        book.setPurchaseCount(book.getPurchaseCount() + 1);

        bookRepository.save(book);
        redisService.saveBook(book.getBookId().toString(), book);
    }

}
