package com.ssafy.backend.domain.challenge.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChallengeDetailResponseDto {

    @JsonProperty("challenge_id")
    private Long challengeId; // 챌린지 ID
    // private UserDto userDto;

    // **
    // UserDto 시작
    // **

    @JsonProperty("user_id")
    private Long userId; // 회원 ID

    private String nickname; // 닉네임

    @JsonProperty("profile_image")
    private String profileImage; // 프로필이미지
    // **
    // UserDto 끝
    // **

    private String title; // 챌린지이름
    private String summary; // 한줄설명
    private String content; // 상세정보
    private String thumbnail; // 썸네일
    private String image; // 이미지
    private int entry; // 참가자수
    private int hit; // 조회수
    private String status; // 상태

    @JsonProperty("start_date")
    private LocalDateTime startDate; // 시작일자

    @JsonProperty("end_date")
    private LocalDateTime endDate; // 종료일자

    public static ChallengeDetailResponseDto toDto(Challenge challenge) {
        return ChallengeDetailResponseDto
                .builder()
                .challengeId(challenge.getChallengeId())
                .userId(challenge.getUser().getUserId())
                .nickname(challenge.getUser().getNickname())
                .profileImage(challenge.getUser().getProfileImage())
                .title(challenge.getTitle())
                .summary(challenge.getSummary())
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
