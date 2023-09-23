package com.goodsteams.libraryservice.service;

import com.goodsteams.libraryservice.dao.LibraryRepository;
import com.goodsteams.libraryservice.dto.BookDTO;
import com.goodsteams.libraryservice.dto.OwnedBookDTO;
import com.goodsteams.libraryservice.dto.PopulatedLibraryDTO;
import com.goodsteams.libraryservice.dto.PopulatedOwnedBookDTO;
import com.goodsteams.libraryservice.entity.Library;
import com.goodsteams.libraryservice.entity.OwnedBook;
import com.goodsteams.libraryservice.exception.LibraryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LibraryService {

    private final TokenService tokenService;
    private final LibraryRepository libraryRepository;
    private final RedisService redisService;

    @Autowired
    public LibraryService(TokenService tokenService, LibraryRepository libraryRepository, RedisService redisService) {
        this.tokenService = tokenService;
        this.libraryRepository = libraryRepository;
        this.redisService = redisService;
    }

    public void saveLibraryByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Library library = new Library(userId);

        libraryRepository.save(library);
    }

    public PopulatedLibraryDTO findLibraryByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Library library = libraryRepository.findLibraryByUserId(userId).orElseThrow(LibraryNotFoundException::new);

        return populateLibrary(library);
    }

    // This called through Kafka Service
    public void addOwnedBook(OwnedBookDTO ownedBookDTO) {
        Library library = libraryRepository.findLibraryByUserId(ownedBookDTO.userId()).orElseThrow(LibraryNotFoundException::new);

        OwnedBook ownedBook = new OwnedBook(library, ownedBookDTO.bookId());

        library.getOwnedBooks().add(ownedBook);
        libraryRepository.save(library);
    }

    private PopulatedLibraryDTO populateLibrary(Library library) {
        List<PopulatedOwnedBookDTO> populatedOwnedBookDTOs = new ArrayList<>();

        for (OwnedBook ownedBook : library.getOwnedBooks()) {
            BookDTO bookData = redisService.getBook(ownedBook.getBookId().toString());

            populatedOwnedBookDTOs.add(new PopulatedOwnedBookDTO(ownedBook.getOwnedBookId(), bookData));
        }

        return new PopulatedLibraryDTO(library.getLibraryId(), library.getUserId(), populatedOwnedBookDTOs);
    }

}
