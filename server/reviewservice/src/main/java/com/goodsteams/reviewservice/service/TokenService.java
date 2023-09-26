package com.goodsteams.reviewservice.service;

import com.goodsteams.reviewservice.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final JwtDecoder jwtDecoder;

    @Autowired
    public TokenService(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    public Jwt decodeToken(String token) {
        return jwtDecoder.decode(token);
    }

    public Long extractTokenUserId(Jwt jwt) {
        String userIdStr = jwt.getClaimAsString("userId");
        Long userId = null;

        try {
            userId = Long.parseLong(userIdStr);
        } catch (Exception e) {
            throw new InvalidTokenException();
        }

        return userId;
    }

}
