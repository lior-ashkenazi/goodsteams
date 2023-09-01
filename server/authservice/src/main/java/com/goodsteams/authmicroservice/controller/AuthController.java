package com.goodsteams.authmicroservice.controller;

import com.goodsteams.authmicroservice.exception.UserRegistrationException;
import com.goodsteams.authmicroservice.requestmodels.UserLoginDTO;
import com.goodsteams.authmicroservice.requestmodels.UserRegistrationDTO;
import com.goodsteams.authmicroservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {

        if (!isValidEmail(userRegistrationDTO.email())) {
            throw new UserRegistrationException("Invalid email address.");
        }

        String jwtToken = authService.registerUser(
                userRegistrationDTO.username(),
                userRegistrationDTO.email(),
                userRegistrationDTO.password()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully.");
        response.put("token", jwtToken);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        String jwtToken = authService.loginUser(userLoginDTO.username(), userLoginDTO.password());
        Map<String, String> response = new HashMap<>();
        response.put("message", "User logged in successfully.");
        response.put("token", jwtToken);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User logged out.");

        return ResponseEntity.ok(response);
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
