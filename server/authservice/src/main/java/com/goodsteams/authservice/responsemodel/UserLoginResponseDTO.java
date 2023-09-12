package com.goodsteams.authservice.responsemodel;

import com.goodsteams.authservice.entity.User;

public record UserLoginResponseDTO (User user, String token){
}
