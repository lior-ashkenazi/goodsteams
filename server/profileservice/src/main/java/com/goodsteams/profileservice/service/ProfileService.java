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
        String username = decodeToken(token);

        Profile profile = new Profile(username);

        profileRepository.save(profile);
    }

    public Profile findProfileByToken(String token) {
        String username = decodeToken(token);

        Optional<Profile> existingProfile = profileRepository.findByUsername(username);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        return existingProfile.get();
    }

    public Profile saveProfileByToken(String token, Profile profile) {
        String username = decodeToken(token);

        Optional<Profile> existingProfile = profileRepository.findByUsername(username);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        return profileRepository.save(profile);
    }
    
    private String decodeToken(String token) {
        Jwt jwt = tokenService.decodeToken(token);

        return jwt.getClaimAsString("sub");
    }


}
