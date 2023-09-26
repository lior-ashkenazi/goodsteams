package com.goodsteams.bookservice.service;

import com.goodsteams.bookservice.dao.BookRepository;
import com.goodsteams.bookservice.dto.PurchasedBookDTO;
import com.goodsteams.bookservice.dto.RedisInitCredentialsDTO;
import com.goodsteams.bookservice.entity.Book;
import com.goodsteams.bookservice.entity.ReviewDTO;
import com.goodsteams.bookservice.exception.BookNotFoundException;
import com.goodsteams.bookservice.exception.RedisInitBadCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    public void addBookReviewRating(ReviewDTO reviewDTO) {
        Book book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(BookNotFoundException::new);

        BigDecimal oldRatingTotal = book.getAverageRating().multiply(BigDecimal.valueOf(book.getRatingCount()));
        BigDecimal newRatingTotal = oldRatingTotal.add(BigDecimal.valueOf(reviewDTO.getRating()));

        int newRatingCount = book.getRatingCount() + 1;

        BigDecimal newAverageRating = newRatingTotal.divide(BigDecimal.valueOf(newRatingCount), 2, RoundingMode.HALF_UP);

        book.setAverageRating(newAverageRating);
        book.setRatingCount(newRatingCount);

        bookRepository.save(book);
        redisService.saveBook(book.getBookId().toString(), book);
    }

    public void updateBookReviewRating(ReviewDTO reviewDTO) {
        Book book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(BookNotFoundException::new);

        BigDecimal oldRatingTotal = book.getAverageRating().multiply(BigDecimal.valueOf(book.getRatingCount()));
        BigDecimal newRatingTotal = oldRatingTotal
                .subtract(BigDecimal.valueOf(reviewDTO.getPreviousRating()))
                .add(BigDecimal.valueOf(reviewDTO.getRating()));

        BigDecimal newAverageRating = newRatingTotal.divide(BigDecimal.valueOf(book.getRatingCount()), 2, RoundingMode.HALF_UP);

        book.setAverageRating(newAverageRating);

        bookRepository.save(book);
        redisService.saveBook(book.getBookId().toString(), book);
    }

    public void subtractBookReviewRating(ReviewDTO reviewDTO) {
        Book book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(BookNotFoundException::new);

        BigDecimal oldRatingTotal = book.getAverageRating().multiply(BigDecimal.valueOf(book.getRatingCount()));
        BigDecimal newRatingTotal = oldRatingTotal.subtract(BigDecimal.valueOf(reviewDTO.getRating()));

        int newRatingCount = book.getRatingCount() - 1;
        newRatingCount = newRatingCount == 0 ? 1 : newRatingCount;

        BigDecimal newAverageRating = newRatingTotal.divide(BigDecimal.valueOf(newRatingCount), 2, RoundingMode.HALF_UP);

        book.setAverageRating(newAverageRating);
        book.setRatingCount(newRatingCount);

        bookRepository.save(book);
        redisService.saveBook(book.getBookId().toString(), book);
    }

}
