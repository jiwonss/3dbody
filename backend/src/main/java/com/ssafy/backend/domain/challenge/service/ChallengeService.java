package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;

import java.util.List;

public interface ChallengeService {
    List<ChallengeListResponseDto> getProceedingChallengeList();
}
