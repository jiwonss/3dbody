package com.ssafy.backend.domain.user.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;

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

    public enum Status {
        MEMBER,
        WITHDRAWAL
    }

    public enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }

    public static User create(String email, String password, String name, Gender gender, String birthDate) {
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .gender(gender)
                .birthDate(birthDate)
                .status(Status.MEMBER)
                .role(Role.ROLE_USER)
                .build();
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

}
