package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.user.entity.User;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponseDto {

    private String email;
    private String name;
    private String nickname;
    private User.Gender gender;
    private long height;
    private long weight;

    @JsonProperty("birth_date")
    private String birthDate;

    @JsonProperty("profile_image")
    private String profileImage;


}
