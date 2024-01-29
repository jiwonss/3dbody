package com.ssafy.backend.domain.challenge.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 챌린지 정보 등록 요청시 사용할 DTO
 */
@Data
public class ChallengeRequestDto {

    @JsonProperty("challenge_id")
    private Long challengeId; // 챌린지 ID

    @JsonProperty("user_id")
    private Long userId; // 회원 ID

    private String title; // 챌린지이름
    private String summary; // 한줄설명
    private String content; // 상세정보
    private String thumbnail; // 썸네일
    private String image; // 이미지

    @JsonProperty("start_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate; // 시작날짜

    @JsonProperty("end_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate; // 종료날짜

}
