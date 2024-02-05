package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.user.entity.User;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdateRequestDto {

    private String name;
    private String nickname;
    private User.Gender gender;
    private float height;
    private float weight;

    @JsonProperty("birth_date")
    private String birthDate;

    @JsonProperty("profile_image")
    private String profileImage;

}
