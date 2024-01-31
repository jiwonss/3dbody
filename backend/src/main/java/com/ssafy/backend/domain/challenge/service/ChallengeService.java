package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeRequestDto;
import com.ssafy.backend.domain.challenge.entity.Challenge;

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

    // 챌린지 정보 등록
    Challenge registerChallenge(ChallengeRequestDto challengeRequestDto);

    // 챌린지 정보 수정
    Challenge updateChallenge(ChallengeRequestDto requestDto);

    // 챌린지 정보 삭제
    void deleteChallenge(Long challengeId);

    // 챌린지 참여 신청
    void applyChallenge(Long challengeId, Long userId);

    // 챌린지 참여 취소
    void leaveChallenge(Long challengeId, Long userId);
}
