package com.ssafy.backend.domain.challenge.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChallengeDetailResponseDto {

    private Long challengeId;
    // private UserDto userDto;

    // **
    // UserDto 시작
    // **
    private Long userId;
    private String nickname;
    private String profileImage;
    // **
    // UserDto 끝
    // **

    private String title;
    private String content;
    private String thumbnail;
    private String image;
    private int entry;
    private int hit;
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
