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

    @JsonProperty("user_id")
    private Long userId; // 회원 ID

    private String title; // 챌린지이름
    private String content; // 내용
    private String thumbnail; // 썸네일
    private String image; // 이미지

    @JsonProperty("start_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'")
    private LocalDateTime startDate; // 시작날짜

    @JsonProperty("end_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'")
    private LocalDateTime endDate; // 종료날짜

}
