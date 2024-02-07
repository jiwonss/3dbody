package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReissueDto {

    @JsonProperty("refresh_token")
    private String refreshToken;

}
