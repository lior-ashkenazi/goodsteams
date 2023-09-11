package com.goodsteams.profileservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "profile")
public class Profile {

    private static final String EMPTY_STRING = "";
    private static LocalDate DEFAULT_BIRTHDATE = LocalDate.of(2020, 1, 1);
    private static final String DEFAULT_AVATAR = "http://www.gravatar.com/avatar/?d=mp";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName = EMPTY_STRING;

    @Column(name = "last_name", nullable = false)
    private String lastName = EMPTY_STRING;

    @Column(nullable = false)
    private String gender = EMPTY_STRING;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate = DEFAULT_BIRTHDATE;

    @Column(name = "avatar_url", nullable = false)
    private String avatarUrl = DEFAULT_AVATAR;

    public Profile() {
    }

    public Profile(String username) {
        this.username = username;
    }
}
