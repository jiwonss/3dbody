package com.ssafy.backend.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PasswordRequestDto {

    private String currentPassword;
    private String newPassword;
    private String newPasswordCheck;

}
