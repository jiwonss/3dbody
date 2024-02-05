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

    private Long userId;
    private String email;
    private String name;
    private String nickname;
    private String gender;
    private float height;
    private float weight;
    private String role;

    @JsonProperty("birth_date")
    private String birthDate;

    @JsonProperty("profile_image")
    private String profileImage;

    public static UserResponseDto from(User user) {
        return UserResponseDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .gender(user.getGender().name())
                .height(user.getHeight())
                .weight(user.getWeight())
                .role(user.getRole().name())
                .birthDate(user.getBirthDate())
                .profileImage(user.getProfileImage())
                .build();
    }


}
