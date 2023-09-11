package com.goodsteams.profileservice.controller;

import com.goodsteams.profileservice.entity.Profile;
import com.goodsteams.profileservice.responsemodel.ProfileResponseDTO;
import com.goodsteams.profileservice.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/")
    public ResponseEntity<ProfileResponseDTO> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        Profile profile = profileService.findProfileByToken(token);

        ProfileResponseDTO response = new ProfileResponseDTO("Profile retrieved successfully.", profile);

        return ResponseEntity.ok(response);

    }

    @PutMapping("/")
    public ResponseEntity<ProfileResponseDTO> authenticateUser(@RequestHeader("Authorization") String authHeader, @RequestBody Profile profile) {
        String token = authHeader.substring(7);

        Profile updatedProfile = profileService.saveProfileByToken(token, profile);

        ProfileResponseDTO response = new ProfileResponseDTO("Profile updated.", updatedProfile);

        return ResponseEntity.ok(response);
    }

}
