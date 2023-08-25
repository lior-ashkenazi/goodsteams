package com.goodsteams.authservice.controller;

import com.goodsteams.authservice.exception.UserRegistrationException;
import com.goodsteams.authservice.requestmodels.UserRegistrationDTO;
import com.goodsteams.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {

        if (!isValidEmail(userRegistrationDTO.email())) {
            throw new UserRegistrationException("Invalid email address.");
        }

        userService.registerUser(userRegistrationDTO);
        return ResponseEntity.ok("User registered successfully.");
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
