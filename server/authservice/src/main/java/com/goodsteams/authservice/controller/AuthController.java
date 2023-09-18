package com.goodsteams.authservice.controller;

import com.goodsteams.authservice.responsemodel.UserAuthenticationResponseDTO;
import com.goodsteams.authservice.responsemodel.UserLoginResponseDTO;
import com.goodsteams.authservice.responsemodel.UserRegistrationResponseDTO;
import com.goodsteams.authservice.service.KafkaService;
import com.goodsteams.authservice.requestmodel.UserLoginRequestDTO;
import com.goodsteams.authservice.requestmodel.UserRegistrationRequestDTO;
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
    public UserRegistrationResponseDTO registerUser(@RequestBody UserRegistrationRequestDTO userRegistrationRequestDTO) {

        UserRegistrationResponseDTO userRegistrationResponseDTO = authService.registerUser(
                userRegistrationRequestDTO.username(),
                userRegistrationRequestDTO.password()
        );

        kafkaService.produceRegistrationEvent(userRegistrationResponseDTO.token());

        return userRegistrationResponseDTO;
    }

    @PostMapping("/login")
    public UserLoginResponseDTO loginUser(@RequestBody UserLoginRequestDTO userLoginRequestDTO) {
        return authService.loginUser(userLoginRequestDTO.username(), userLoginRequestDTO.password());
    }

    @GetMapping("/")
    public UserAuthenticationResponseDTO authenticateUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return authService.authenticateUserToken(token);
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser() {
        Map<String, String> response = Map.of("message", "User logged out.");

        return ResponseEntity.ok(response);
    }

}
