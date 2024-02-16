package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponseDto {

    @JsonProperty("user_info")
    private UserResponseDto userInfo;

    private TokenDto token;

}
