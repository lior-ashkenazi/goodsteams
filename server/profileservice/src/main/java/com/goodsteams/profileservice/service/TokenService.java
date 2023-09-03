package com.goodsteams.profileservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;


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

}
