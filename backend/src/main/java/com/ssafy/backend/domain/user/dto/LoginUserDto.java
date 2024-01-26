package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDto {

    private Long userId;
    private String email;
    private String role;
    private String nickname;
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
