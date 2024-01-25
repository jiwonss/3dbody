package com.ssafy.backend.domain.challenge.dto;

import com.ssafy.backend.domain.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
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

    public static ChallengeDetailResponseDto toDto(Challenge challenge) {
        return ChallengeDetailResponseDto
                .builder()
                .challengeId(challenge.getChallengeId())
                .userId(challenge.getUser().getUserId())
                .nickname(challenge.getUser().getNickname())
                .profileImage(challenge.getUser().getProfileImage())
                .title(challenge.getTitle())
                .content(challenge.getContent())
                .thumbnail(challenge.getThumbnail())
                .image(challenge.getImage())
                .entry(challenge.getEntry())
                .hit(challenge.getHit())
//                .status(null)
                .startDate(challenge.getStartDate())
                .endDate(challenge.getEndDate())
                .build();
    }

}
