package com.goodsteams.profileservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name="profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String firstName = "";

    @Column(nullable = false)
    private String lastName = "";

    @Column(nullable = false)
    private String gender = "";

    @Column(nullable = false)
    private LocalDate birthDate = LocalDate.of(2020, 1, 1);

    @Column(nullable = false)
    private String avatarUrl = "http://www.gravatar.com/avatar/?d=mp";

    public Profile() {
    }

    public Profile(String username) {
        this.username = username;
    }
}
