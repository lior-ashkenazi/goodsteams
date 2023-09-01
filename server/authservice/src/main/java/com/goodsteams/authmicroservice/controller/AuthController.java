package com.goodsteams.authmicroservice.controller;

import com.goodsteams.authmicroservice.exception.InvalidTokenFormatException;
import com.goodsteams.authmicroservice.exception.UserRegistrationException;
import com.goodsteams.authmicroservice.requestmodels.UserLoginDTO;
import com.goodsteams.authmicroservice.requestmodels.UserRegistrationDTO;
import com.goodsteams.authmicroservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController (AuthService authService) {
        this.authService = authService;
    }



    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {

        if (!isValidEmail(userRegistrationDTO.email())) {
            throw new UserRegistrationException("Email address is invalid.");
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

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestHeader("Authorization") String authHeader) {

        // Extract the token from the header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidTokenFormatException();
        }

        String token = authHeader.substring(7);

        // Delegate to AuthService
        String newToken = authService.authenticateUser(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User is authenticated.");
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser() {
        Map<String, String> response = Map.of("message", "User logged out.");

        return ResponseEntity.ok(response);
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
