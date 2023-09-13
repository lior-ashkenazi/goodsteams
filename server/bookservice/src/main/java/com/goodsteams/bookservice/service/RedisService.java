package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RedisService implements CommandLineRunner {

    private static final String INITIAL_LOAD_KEY = "INITIAL_LOAD_DONE";
    private final RedisTemplate<String, Object> redisTemplate;
    private final BookRepository bookRepository;


    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate, BookRepository bookRepository) {
        this.redisTemplate = redisTemplate;
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        storeBookToBookPricePairings();
    }

    public boolean isInitialLoadDone() {
        return Boolean.TRUE.equals(redisTemplate.hasKey(INITIAL_LOAD_KEY));
    }

    public void markInitialLoadDone() {
        redisTemplate.opsForValue().set(INITIAL_LOAD_KEY, true);
    }

    public void setBookPrice(Long bookId, BigDecimal price) {
        // Store book prices with a prefix for clarity and organization
        String key = "BOOK_PRICE_" + bookId;

        // Here we're always setting the price. If you only want to set it once,
        // you can first check if it exists using redisTemplate.hasKey(key).
        redisTemplate.opsForValue().set(key, price);
    }

    private void storeBookToBookPricePairings() {
        if (isInitialLoadDone()) return;

        List<Book> books = bookRepository.findAll();

        for (Book book : books) {
            setBookPrice(book.getBookId(), book.getPrice());
        }

        markInitialLoadDone();

    }
}

