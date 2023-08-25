package com.goodsteams.authservice.requestmodels;

public record UserRegistrationDTO(String username, String email, String password, String repeatedPassword) {
}
