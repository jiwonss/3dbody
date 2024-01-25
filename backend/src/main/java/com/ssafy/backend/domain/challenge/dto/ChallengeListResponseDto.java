package com.ssafy.backend.domain.challenge.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChallengeListResponseDto {

    private Long challengeId;
    private String title;
    private String thumbnail;
    private int entry;
    private int hit;

    private Long userId;
    private String nickname;
}
