package com.goodsteams.profileservice.service;

import com.goodsteams.profileservice.dao.ProfileRepository;
import com.goodsteams.profileservice.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;


import java.time.Instant;
import java.util.Collections;
import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final TokenService tokenService;


    @Autowired
    public ProfileService(ProfileRepository profileRepository, TokenService tokenService) {
        this.profileRepository = profileRepository;
        this.tokenService = tokenService;
    }

    public void saveProfileByUsername(String token) {
        Jwt jwt = tokenService.decodeToken(token);

        String username = jwt.getClaimAsString("sub");

        Profile profile = new Profile(username);

        profileRepository.save(profile);
    }

    public Optional<Profile> getProfileByUsername(String username) {
        return profileRepository.findByUsername(username);
    }

}
