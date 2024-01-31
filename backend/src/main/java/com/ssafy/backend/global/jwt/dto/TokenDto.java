package com.ssafy.backend.global.jwt.dto;

import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

    private String accessToken;
    private long accessTokenExpired;
    private String refreshToken;
    private long refreshTokenExpired;

}
