package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginUserDto {

    @JsonProperty("user_id")
    private Long userId;

    private String email;
    private String role;
    private String nickname;

    @JsonProperty("profile_image")
    private String profileImage;

    public static LoginUserDto from(UserInfoDto info) {
        return LoginUserDto.builder()
                .userId(info.getUserId())
                .email(info.getEmail())
                .nickname(info.getNickname())
                .profileImage(info.getProfileImage())
                .role(info.getRole())
                .build();
    }

}
