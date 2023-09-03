package com.goodsteams.profileservice.responsemodels;

import com.goodsteams.profileservice.entity.Profile;
import lombok.Data;

@Data
public class ProfileResponseDTO {
    private String message;
    private Profile profile;
}
