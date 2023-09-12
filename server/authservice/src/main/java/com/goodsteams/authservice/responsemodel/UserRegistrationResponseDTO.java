package com.goodsteams.authservice.responsemodel;

import com.goodsteams.authservice.entity.User;

public record UserRegistrationResponseDTO(User user, String token) {
}
