package com.goodsteams.libraryservice.service;

import com.goodsteams.libraryservice.dao.OwnedBookRepository;
import com.goodsteams.libraryservice.dto.OwnedBookDTO;
import com.goodsteams.libraryservice.entity.OwnedBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibraryService {

    private final OwnedBookRepository ownedBookRepository;
    private final TokenService tokenService;

    @Autowired
    public LibraryService(OwnedBookRepository ownedBookRepository, TokenService tokenService) {
        this.ownedBookRepository = ownedBookRepository;
        this.tokenService = tokenService;
    }

    public List<OwnedBook> getOwnedBookListByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        return ownedBookRepository.findByUserId(userId);
    }

    public void saveOwnedBook(OwnedBookDTO ownedBookDTO) {
        OwnedBook ownedBook = new OwnedBook(
                ownedBookDTO.userId(),
                ownedBookDTO.bookId(),
                ownedBookDTO.title(),
                ownedBookDTO.author(),
                ownedBookDTO.coverImageUrl());

        ownedBookRepository.save(ownedBook);
    }
}
