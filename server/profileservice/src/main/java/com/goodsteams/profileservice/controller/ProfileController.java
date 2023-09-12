package com.goodsteams.profileservice.controller;

import com.goodsteams.profileservice.entity.Profile;
import com.goodsteams.profileservice.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/secure")
    public Profile getProfileByToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);

        return profileService.findProfileByToken(token);
    }

    @PutMapping("/secure")
    public Profile updateProfile(@RequestHeader("Authorization") String authHeader, @RequestBody Profile profile) {
        String token = authHeader.substring(7);

        return profileService.saveProfileByToken(token, profile);
    }

    @GetMapping("/public/{userId}")
    public Profile getProfileByUserId(@PathVariable Long userId) {
        return profileService.findProfileByUserId(userId);
    }

}
