package com.ssafy.backend.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PinRequestDto {

    private String currentPin;
    private String newPin;
    private String newPinCheck;

}
