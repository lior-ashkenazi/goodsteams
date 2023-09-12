package com.goodsteams.authservice.responsemodel;

import com.goodsteams.authservice.entity.User;

public record UserAuthenticationResponseDTO(User user, String token) {
}
