package com.ssafy.backend.domain.user.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String password;
    private String pin;
    private String name;
    private String nickname;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    private String birthDate;
    private String profileImage;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private Role role;

    enum Sex {
        MALE,
        FEMALE
    }

    enum Status {
        MEMBER,
        WITHDRAWAL
    }

    enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }

}
