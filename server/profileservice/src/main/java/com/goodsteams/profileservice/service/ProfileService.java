package com.goodsteams.profileservice.service;

import com.goodsteams.profileservice.dao.ProfileRepository;
import com.goodsteams.profileservice.entity.Profile;
import com.goodsteams.profileservice.exception.InvalidTokenException;
import com.goodsteams.profileservice.exception.ProfileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;


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

    public void saveProfileByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = extractTokenUserId(jwt);
        String username = extractTokenUsername(jwt);

        Profile profile = new Profile(userId, username);

        profileRepository.save(profile);
    }

    public Profile findProfileByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = extractTokenUserId(jwt);

        Optional<Profile> existingProfile = profileRepository.findByUserId(userId);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        return existingProfile.get();
    }

    public Profile saveProfileByToken(String token, Profile profile) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = extractTokenUserId(jwt);

        Optional<Profile> existingProfile = profileRepository.findByUserId(userId);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        return profileRepository.save(profile);
    }

    private Long extractTokenUserId(Jwt jwt) {
        String userIdStr = jwt.getClaimAsString("userId");
        Long userId = null;

        try {
            userId = Long.parseLong(userIdStr);
        } catch (Exception e) {
            throw new InvalidTokenException();
        }

        return userId;
    }

    private String extractTokenUsername(Jwt jwt) {
        return jwt.getClaimAsString("sub");
    }

}
