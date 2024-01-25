package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.repository.ChallengeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class ChallengeServiceImpl implements ChallengeService {

    private ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @Override
    public List<ChallengeListResponseDto> getProceedingChallengeList() {
        LocalDateTime now = LocalDateTime.now();
        log.info("ChallengeService - getProceedingChallengeList 호출, 현재 시간 : {}", now);
        return challengeRepository.findAllByEndDateIsBefore(now);
    }
}
