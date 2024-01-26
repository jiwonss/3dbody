package com.ssafy.backend.global.jwt.dto;

import com.ssafy.backend.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private Long userId;
    private String email;
    private String role;
    private String nickname;
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
