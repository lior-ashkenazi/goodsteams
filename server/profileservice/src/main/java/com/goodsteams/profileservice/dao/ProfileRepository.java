package com.goodsteams.profileservice.dao;

import com.goodsteams.profileservice.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    boolean existsByUserId(Long userId);
    Optional<Profile> findByUserId(Long userId);
}