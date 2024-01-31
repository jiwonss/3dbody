package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.entity.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


public interface UserChallengeRepository extends JpaRepository<UserChallenge, Long>, UserChallengeCustomRepository {

    void deleteAllByChallenge_ChallengeId(Long challengeId);

    void deleteByChallenge_ChallengeIdAndUser_UserId(@Param("challenge_id") Long challengeId, @Param("user_id") Long userId);

    boolean existsByChallenge_ChallengeIdAndUser_UserId(@Param("challenge_id") Long challengeId, @Param("user_id") Long userId);

}
