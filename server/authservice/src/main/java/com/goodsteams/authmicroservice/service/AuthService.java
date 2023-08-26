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

    public String registerUser(UserRegistrationDTO userRegistrationDTO) {

        if (userRegistrationDTO.password().length() < 6) {
            throw new UserRegistrationException("Password should be at least 6 characters long.");
        }

        if (!userRegistrationDTO.password().equals(userRegistrationDTO.repeatedPassword())) {
            throw new UserRegistrationException("Password do no match.");
        }

        if (authRepository.existsByUsername(userRegistrationDTO.username())) {
            throw new UsernameAlreadyExistsException();
        }

        if (authRepository.existsByEmail(userRegistrationDTO.email())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(userRegistrationDTO.username());
        user.setEmail(userRegistrationDTO.email());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.password()));

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

    public String loginUser(UserLoginDTO userLoginDTO) {

        // Fetch user from the database using the provided username
        User user = authRepository.findByUsername(userLoginDTO.username())
                .orElseThrow(() -> new UserNotFoundException(userLoginDTO.username()));

        // Validate the provided password with the one in the database
        if (!passwordEncoder.matches(userLoginDTO.password(), user.getPassword())) {
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
