package com.goodsteams.profileservice.controller;

import com.goodsteams.profileservice.entity.Profile;
import com.goodsteams.profileservice.exception.ProfileNotFoundException;
import com.goodsteams.profileservice.responsemodels.ProfileResponseDTO;
import com.goodsteams.profileservice.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @PostMapping("/")
    public ResponseEntity<Map<String, String>> createProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        profileService.saveProfileByToken(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile was created for user.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<ProfileResponseDTO> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        Profile profile = profileService.findProfileByToken(token);

        ProfileResponseDTO response = new ProfileResponseDTO();
        response.setMessage("Profile retrieved successfully.");
        response.setProfile(profile);

        return ResponseEntity.ok(response);

    }

    @PutMapping("/")
    public ResponseEntity<ProfileResponseDTO> authenticateUser(@RequestHeader("Authorization") String authHeader, @RequestBody Profile profile) {
        String token = authHeader.substring(7);

        Profile updatedProfile = profileService.saveProfileByToken(token, profile);

        ProfileResponseDTO response = new ProfileResponseDTO();
        response.setMessage("Profile updated.");
        response.setProfile(updatedProfile);

        return ResponseEntity.ok(response);
    }

}
