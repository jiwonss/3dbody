package com.ssafy.backend.domain.user.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String email;

    private String password;

    private String pin;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String birthDate;

    @Lob
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Gender {
        MALE("남자"),
        FEMALE("여자");

        private String value;

        Gender(String value) {
            this.value = value;
        }


    }

    enum Status {
        MEMBER,
        WITHDRAWAL
    }

    enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }

    @Builder
    public User(String email, String password, String name, Gender gender, String birthDate) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.birthDate = birthDate;
    }

}
