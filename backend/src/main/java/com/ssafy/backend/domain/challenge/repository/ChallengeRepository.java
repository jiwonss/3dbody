package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
