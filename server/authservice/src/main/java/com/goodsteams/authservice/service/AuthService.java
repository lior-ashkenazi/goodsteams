package com.goodsteams.authservice.service;

import com.goodsteams.authservice.dao.AuthRepository;
import com.goodsteams.authservice.entity.User;
import com.goodsteams.authservice.exception.*;
import com.goodsteams.authservice.responsemodel.UserAuthenticationResponseDTO;
import com.goodsteams.authservice.responsemodel.UserLoginResponseDTO;
import com.goodsteams.authservice.responsemodel.UserRegistrationResponseDTO;
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

    public UserRegistrationResponseDTO registerUser(String username, String password) {

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
        String token = tokenService.generateToken(auth, user.getUserId());

        return new UserRegistrationResponseDTO(user, token);
    }

    public UserLoginResponseDTO loginUser(String username, String password) {

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


        String token = tokenService.generateToken(auth, user.getUserId());

        return new UserLoginResponseDTO(user, token);
    }

    public UserAuthenticationResponseDTO authenticateUserToken(String token) {

        Jwt jwt = tokenService.decodeToken(token);

        String username = jwt.getClaimAsString("sub");

        String userIdStr = jwt.getClaimAsString("userId");
        Long userId = null;

        try {
            userId = Long.parseLong(userIdStr);
        } catch (Exception e) {
            throw new InvalidTokenException();
        }

        Instant expirationDate = jwt.getExpiresAt();

        // Check if token is expired
        assert expirationDate != null;
        if (expirationDate.isBefore(Instant.now())) {
            throw new TokenExpiredException();
        }

        // Verify if user exists in database
        User user = authRepository.findById(userId).orElseThrow(InvalidTokenException::new);

        // If validation is successful, generate a JWT token
        Authentication auth = new UsernamePasswordAuthenticationToken(
                username,
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        // Generate a new JWT token if all verifications are successful
        String newToken = tokenService.generateToken(auth, userId);

        return new UserAuthenticationResponseDTO(user, newToken);
    }

}
