package com.goodsteams.profileservice.responsemodel;

import com.goodsteams.profileservice.entity.Profile;

public record ProfileResponseDTO (String message, Profile profile) {
}
