package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PinRequestDto {

    @JsonProperty("current_pin")
    private String currentPin;

    @JsonProperty("new_pin")
    private String newPin;

    @JsonProperty("new_pin_check")
    private String newPinCheck;

}
