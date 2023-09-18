package com.goodsteams.libraryservice.service;

import com.goodsteams.libraryservice.dao.LibraryRepository;
import com.goodsteams.libraryservice.dto.OwnedBookDTO;
import com.goodsteams.libraryservice.entity.Library;
import com.goodsteams.libraryservice.entity.OwnedBook;
import com.goodsteams.libraryservice.exception.LibraryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class LibraryService {

    private final TokenService tokenService;
    private final LibraryRepository libraryRepository;

    @Autowired
    public LibraryService(TokenService tokenService, LibraryRepository libraryRepository) {
        this.tokenService = tokenService;
        this.libraryRepository = libraryRepository;
    }

    public void saveLibraryByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Library library = new Library(userId);

        libraryRepository.save(library);
    }

    public Library findLibraryByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        return libraryRepository.findLibraryByUserId(userId).orElseThrow(LibraryNotFoundException::new);
    }

    public void addOwnedBook(OwnedBookDTO ownedBookDTO) {
        Library library = libraryRepository
                .findLibraryByUserId(ownedBookDTO.userId())
                .orElseThrow(LibraryNotFoundException::new);

        OwnedBook ownedBook = new OwnedBook(
                library,
                ownedBookDTO.bookId(),
                ownedBookDTO.title(),
                ownedBookDTO.author(),
                ownedBookDTO.coverImageUrl()
        );

        library.getOwnedBooks().add(ownedBook);
        libraryRepository.save(library);
    }

}
