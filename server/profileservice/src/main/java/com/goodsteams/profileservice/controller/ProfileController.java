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

        profileService.saveProfileByUsername(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile was created for user.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<ProfileResponseDTO> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        Optional<Profile> profile = profileService.getProfileByUsername(token);

        if (profile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        ProfileResponseDTO response = new ProfileResponseDTO();
        response.setMessage("Profile retrieved successfully.");
        response.setProfile(profile.get());

        return ResponseEntity.ok(response);

    }

    @PutMapping("/")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestHeader("Authorization") String authHeader, @RequestBody Profile profile) {
        String token = authHeader.substring(7);

        Optional<Profile> existingProfile = profileService.getProfileByUsername(token);

        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException();
        }

        profileService.updateProfile(profile);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User is authenticated.");
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }


    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
