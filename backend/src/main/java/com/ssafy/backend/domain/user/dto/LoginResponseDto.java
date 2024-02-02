package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponseDto {

    @JsonProperty("user_info")
    private UserInfoDto userInfo;

    private TokenDto token;

}
