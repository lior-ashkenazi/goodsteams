package com.goodsteams.authmicroservice.service;

import com.goodsteams.authmicroservice.dao.AuthRepository;
import com.goodsteams.authmicroservice.entity.User;
import com.goodsteams.authmicroservice.exception.*;
import com.goodsteams.authmicroservice.requestmodels.UserLoginDTO;
import com.goodsteams.authmicroservice.requestmodels.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Collections;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private TokenService tokenService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(String username, String email, String password, String repeatedPassword) {

        if (password.length() < 6) {
            throw new UserRegistrationException("Password should be at least 6 characters long.");
        }

        if (!password.equals(repeatedPassword)) {
            throw new UserRegistrationException("Password do no match.");
        }

        if (authRepository.existsByUsername(username)) {
            throw new UsernameAlreadyExistsException();
        }

        if (authRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

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

}
