package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;

import java.util.List;

public interface ChallengeService {

    // 참여가능 챌린지 목록
    List<ChallengeListResponseDto> getProceedingChallengeList();

    // 참여중 챌린지 목록
    List<ChallengeListResponseDto> getJoiningChallengeList(Long userId);

    // 종료된 챌린지 목록
    List<ChallengeListResponseDto> getFinishedChallengeList();

    // 챌린지 상세 조회
    ChallengeDetailResponseDto getChallengeDetail(Long challengeId);
}
