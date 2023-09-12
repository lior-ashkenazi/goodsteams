package com.goodsteams.authservice.controller;

import com.goodsteams.authservice.service.KafkaService;
import com.goodsteams.authservice.requestmodels.UserLoginDTO;
import com.goodsteams.authservice.requestmodels.UserRegistrationDTO;
import com.goodsteams.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final KafkaService kafkaService;

    @Autowired
    public AuthController (AuthService authService, KafkaService kafkaService) {
        this.authService = authService;
        this.kafkaService = kafkaService;
    }



    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {

        String jwtToken = authService.registerUser(
                userRegistrationDTO.username(),
                userRegistrationDTO.password()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully.");
        response.put("token", jwtToken);

        kafkaService.sendRegistrationEvent(jwtToken);

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
        String token = authHeader.substring(7);

        // Delegate to AuthService
        String newToken = authService.authenticateUserToken(token);

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

}
