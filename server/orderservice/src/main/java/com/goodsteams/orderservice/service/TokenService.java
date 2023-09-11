package com.goodsteams.orderservice.service;

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

}
