package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.entity.User;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SignupRequestDto {

    private String email;
    private String password;
    private String name;
    private User.Gender gender;
    private String birthDate;

    public User toEntity() {
        return new User(email, password, name, gender, birthDate);
    }

}
