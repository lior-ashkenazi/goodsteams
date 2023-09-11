package com.goodsteams.authservice.service;

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
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public TokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    public String generateToken(Authentication authentication, Long userId) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(3, ChronoUnit.HOURS)) // 3 hours
                .subject(authentication.getName()) // This is where the username is stored
                .claim("userId", userId) // Add the userId as a claim
                .claim("scope", scope)
                .build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decodeToken(String token) {
        return jwtDecoder.decode(token);
    }

}
