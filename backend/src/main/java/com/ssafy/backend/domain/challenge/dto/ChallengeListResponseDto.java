package com.ssafy.backend.domain.challenge.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChallengeListResponseDto {

    @JsonProperty("challenge_id")
    private Long challengeId; // 챌린지 ID
    private String title; // 챌린지이름
    private String summary; // 한줄설명
    private String thumbnail; // 썸네일
    private int entry; // 참가자수
    private int hit; // 조회수

    @JsonProperty("user_id")
    private Long userId; // 회원 ID
    private String nickname; // 닉네임

    @JsonProperty("start_date")
    private LocalDateTime startDate; // 시작일자

    @JsonProperty("end_date")
    private LocalDateTime endDate; // 종료일자

    public static ChallengeListResponseDto toDto(Challenge challenge) {
        return ChallengeListResponseDto
                .builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .summary(challenge.getSummary())
                .thumbnail(challenge.getThumbnail())
                .entry(challenge.getEntry())
                .hit(challenge.getHit())
                .userId(challenge.getUser().getUserId())
                .nickname(challenge.getUser().getNickname())
                .startDate(challenge.getStartDate())
                .endDate(challenge.getEndDate())
                .build();
    }
}
