package com.ssafy.backend.global.jwt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("access_token_expired")
    private long accessTokenExpired;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("refresh_token_expired")
    private long refreshTokenExpired;

}
