package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.entity.UserChallenge;

import java.util.Optional;

public interface UserChallengeCustomRepository {


    // 챌린지 등록 여부
    Optional<UserChallenge> exist(Long userId, Long challengeId);
}
