package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String email;
    private String name;
    private String nickname;
    private User.Gender gender;
    private long height;
    private long weight;
    private String birthDate;
    private String profileImage;


}
