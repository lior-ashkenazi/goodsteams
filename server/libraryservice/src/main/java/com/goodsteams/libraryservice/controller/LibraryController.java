package com.goodsteams.libraryservice.controller;

import com.goodsteams.libraryservice.entity.Library;
import com.goodsteams.libraryservice.entity.OwnedBook;
import com.goodsteams.libraryservice.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping("/")
    public Library getLibraryByToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return libraryService.findLibraryByToken(token);
    }
}
