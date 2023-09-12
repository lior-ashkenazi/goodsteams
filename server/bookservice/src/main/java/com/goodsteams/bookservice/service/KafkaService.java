package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaService implements CommandLineRunner {

    private final KafkaTemplate<String, Book> kafkaTemplate;
    private final BookRepository bookRepository;

    @Autowired
    public KafkaService(KafkaTemplate<String, Book> kafkaTemplate, BookRepository bookRepository) {
        this.kafkaTemplate = kafkaTemplate;
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        emitAllBooks();
    }

    public void emitAllBooks() {
        List<Book> books = bookRepository.findAll();

        for (Book book : books) {
            kafkaTemplate.send("book-price-initialization-topic", book);
        }
    }
}
