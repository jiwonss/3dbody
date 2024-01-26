package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.entity.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserChallengeRepository extends JpaRepository<UserChallenge, Long>, UserChallengeCustomRepository {
}
