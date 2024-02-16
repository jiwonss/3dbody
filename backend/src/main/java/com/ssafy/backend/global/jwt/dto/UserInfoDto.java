package com.ssafy.backend.global.jwt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.user.entity.User;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    @JsonProperty("user_id")
    private Long userId;

    private String email;
    private String role;
    private String nickname;

    @JsonProperty("profile_image")
    private String profileImage;

    public static UserInfoDto from(User user) {
        return UserInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .role(user.getRole().name())
                .build();
    }

}
