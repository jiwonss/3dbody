package com.ssafy.backend.domain.challenge.service;

import com.ssafy.backend.domain.challenge.repository.ChallengeRepository;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

}
