package com.goodsteams.authservice.service;

import com.goodsteams.authservice.dao.UserRepository;
import com.goodsteams.authservice.entity.User;
import com.goodsteams.authservice.exception.EmailAlreadyExistsException;
import com.goodsteams.authservice.exception.UserRegistrationException;
import com.goodsteams.authservice.exception.UsernameAlreadyExistsException;
import com.goodsteams.authservice.requestmodels.UserRegistrationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(UserRegistrationDTO userRegistrationDTO) {

        if (userRegistrationDTO.password().length() < 6) {
            throw new UserRegistrationException("Password should be at least 6 characters long.");
        }

        if (!userRegistrationDTO.password().equals(userRegistrationDTO.repeatedPassword())) {
            throw new UserRegistrationException("Password do no match.");
        }

        if (userRepository.existsByUsername(userRegistrationDTO.username())) {
            throw new UsernameAlreadyExistsException();
        }

        if (userRepository.existsByEmail(userRegistrationDTO.email())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(userRegistrationDTO.username());
        user.setEmail(userRegistrationDTO.username());
        user.setPassword(userRegistrationDTO.password());

        userRepository.save(user);
    }
}
