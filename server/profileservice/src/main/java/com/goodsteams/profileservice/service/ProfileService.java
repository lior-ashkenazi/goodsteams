package com.goodsteams.profileservice.service;

import com.goodsteams.profileservice.dao.ProfileRepository;
import com.goodsteams.profileservice.entity.Profile;
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
        Long userId = tokenService.extractTokenUserId(jwt);
        String username = tokenService.extractTokenUsername(jwt);

        Profile profile = new Profile(userId, username);

        profileRepository.save(profile);
    }

    public Profile findProfileByToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        Optional<Profile> existingProfile = profileRepository.findByUserId(userId);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        return existingProfile.get();
    }

    public Profile saveProfileByToken(String token, Profile profile) {
        Jwt jwt = tokenService.decodeToken(token);
        Long userId = tokenService.extractTokenUserId(jwt);

        boolean existingProfile = profileRepository.existsByUserId(userId);

        if (!existingProfile) {
            throw new ProfileNotFoundException();
        }

        return profileRepository.save(profile);
    }

    public Profile findProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId).orElseThrow(ProfileNotFoundException::new);
    }

}
