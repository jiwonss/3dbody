package com.ssafy.backend.domain.user.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LoginRequestDto {

    private String email;
    private String password;

}
