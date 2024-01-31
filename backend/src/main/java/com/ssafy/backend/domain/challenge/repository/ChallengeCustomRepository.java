package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;

import java.util.List;

public interface ChallengeCustomRepository {
    // 참여중인 챌린지 목록
    List<ChallengeListResponseDto> findChallengeWithUserChallenge(Long userId);

    // 참가자수 1 증가
    void addEntry(Long challengeId);

    // 참가자수 1 감ㅅ호
    void subEntry(Long challengeId);
}
