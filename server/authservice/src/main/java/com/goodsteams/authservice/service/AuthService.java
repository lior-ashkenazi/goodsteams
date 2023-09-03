package com.goodsteams.authservice.service;

import com.goodsteams.authservice.dao.AuthRepository;
import com.goodsteams.authservice.entity.User;
import com.goodsteams.authservice.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;


import java.time.Instant;
import java.util.Collections;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final TokenService tokenService;

    @Autowired
    public AuthService(AuthRepository authRepository, TokenService tokenService) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(String username, String password) {

        if (authRepository.existsByUsername(username)) {
            throw new UsernameAlreadyExistsException();
        }

        if (password.length() < 6) {
            throw new UserRegistrationException("Password should be at least 6 characters long.");
        }

        User user = new User(username, passwordEncoder.encode(password));

        authRepository.save(user);

        // Create an Authentication object for the newly registered user
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );

        // Use the TokenService to generate a JWT for the user
        return tokenService.generateToken(auth);
    }

    public String loginUser(String username, String password) {

        // Fetch user from the database using the provided username
        User user = authRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));

        // Validate the provided password with the one in the database
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException();
        }

        // If validation is successful, generate a JWT token
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        return tokenService.generateToken(auth);
    }

    public String authenticateUser(String token) {

        Jwt jwt = tokenService.decodeToken(token);

        String username = jwt.getClaimAsString("sub");
        Instant expirationDate = jwt.getExpiresAt();

        // Verify if user exists in database
        boolean userExists = authRepository.existsByUsername(username);
        if (!userExists) {
            throw new InvalidTokenException();
        }

        // Check if token is expired
        assert expirationDate != null;
        if (expirationDate.isBefore(Instant.now())) {
            throw new TokenExpiredException();
        }

        // If validation is successful, generate a JWT token
        Authentication auth = new UsernamePasswordAuthenticationToken(
                username,
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        // Generate a new JWT token if all verifications are successful
        return tokenService.generateToken(auth);
    }

}
