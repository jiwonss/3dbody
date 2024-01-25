package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;

import java.util.List;

public interface ChallengeService {

    // 진행중인 챌린지 목록
    List<ChallengeListResponseDto> getProceedingChallengeList();

    // 종료된 챌린지 목록
    List<ChallengeListResponseDto> getFinishedChallengeList();
}
