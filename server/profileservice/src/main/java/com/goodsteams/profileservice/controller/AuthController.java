package com.goodsteams.profileservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController (AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        // Delegate to AuthService
        String newToken = authService.authenticateUser(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User is authenticated.");
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        // Delegate to AuthService
        String newToken = authService.authenticateUser(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User is authenticated.");
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        // Delegate to AuthService
        String newToken = authService.authenticateUser(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User is authenticated.");
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }


    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
