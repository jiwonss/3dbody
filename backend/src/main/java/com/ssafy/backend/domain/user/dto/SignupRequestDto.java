package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("birth_date")
    private String birthDate;

    private User.Role role;

    public User toEntity() {
        return User.create(email, password, name, gender, birthDate, role);
    }

}
