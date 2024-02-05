package com.ssafy.backend.domain.user.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, updatable = false, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String pin;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String birthDate;

    private float height;

    private float weight;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Gender {
        MALE("남자"),
        FEMALE("여자");

        private String value;

        Gender(String value) {
            this.value = value;
        }
    }

    public enum Status {
        MEMBER,
        WITHDRAWAL
    }

    public enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }

    public static User create(String email, String password, String name, Gender gender, String birthDate, Role role) {
        if (role == null) {
            role = Role.ROLE_USER;
        }
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .gender(gender)
                .birthDate(birthDate)
                .status(Status.MEMBER)
                .role(role)
                .build();
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateStatus(Status status) { this.status = status; }

    public void updatePin(String pin) {
        this.pin = pin;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateGender(Gender gender) {
        this.gender = gender;
    }

    public void updateBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public void updateHeight(float height) {
        this.height = height;
    }

    public void updateWeight(float weight) {
        this.weight = weight;
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

}

