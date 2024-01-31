package com.ssafy.backend.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class LoginRequestDto {

    private String email;
    private String password;

}
