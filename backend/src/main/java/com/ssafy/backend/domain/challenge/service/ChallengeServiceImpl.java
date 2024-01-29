package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeRequestDto;
import com.ssafy.backend.domain.challenge.entity.Challenge;
import com.ssafy.backend.domain.challenge.repository.ChallengeRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    // 참여가능 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> getProceedingChallengeList() {
        LocalDateTime now = LocalDateTime.now();
        log.info("ChallengeService - getProceedingChallengeList 호출, 현재 시간 : {}", now);
        return challengeRepository.findAllByEndDateIsAfter(now);
    }

    // 참여중 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> getJoiningChallengeList(Long userId) {
        return challengeRepository.findChallengeWithUserChallenge(userId);
    }

    // 종료된 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> getFinishedChallengeList() {
        LocalDateTime now = LocalDateTime.now();
        log.info("ChallengeService - getFinishedChallengeList 호출, 현재 시간 : {}", now);
        return challengeRepository.findAllByEndDateIsBefore(now);
    }

    // 챌린지 상세 조회
    @Override
    public ChallengeDetailResponseDto getChallengeDetail(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 챌린지입니다."));
        return ChallengeDetailResponseDto.toDto(challenge);
    }

    // 챌린지 정보 등록
    @Override
    @Transactional
    public Challenge registerChallenge(ChallengeRequestDto requestDto) {
        User user = userRepository.getReferenceById(requestDto.getUserId());
        log.info("챌린지 정보 등록 - getReferenceById 결과 : {}", user);
        Challenge challenge = Challenge.builder()
                .user(user)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .thumbnail(requestDto.getThumbnail())
                .image(requestDto.getImage())
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .build();
        return challengeRepository.save(challenge);
    }

    // 챌린지 정보 수정
    @Override
    @Transactional
    public Challenge updateChallenge(ChallengeRequestDto requestDto) {
        log.info("챌린지 정보 수정 - serviceImpl");
        Challenge challenge = Challenge.builder()
                .challengeId(requestDto.getChallengeId())
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .thumbnail(requestDto.getThumbnail())
                .image(requestDto.getImage())
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .build();
        return challengeRepository.save(challenge);
    }


}
