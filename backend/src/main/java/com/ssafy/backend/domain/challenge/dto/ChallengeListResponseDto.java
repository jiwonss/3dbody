package com.ssafy.backend.domain.challenge.dto;

import com.ssafy.backend.domain.challenge.entity.Challenge;
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

    public static ChallengeListResponseDto toDto(Challenge challenge) {
        return ChallengeListResponseDto
                .builder()
                .challengeId(challenge.getChallengeId())
                .title(challenge.getTitle())
                .thumbnail(challenge.getThumbnail())
                .entry(challenge.getEntry())
                .hit(challenge.getHit())
                .userId(challenge.getUser().getUserId())
                .nickname(challenge.getUser().getNickname())
                .build();
    }
}
