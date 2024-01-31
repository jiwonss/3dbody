package com.ssafy.backend.domain.challenge.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.challenge.entity.QUserChallenge;
import com.ssafy.backend.domain.challenge.entity.UserChallenge;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class UserChallengeCustomRepositoryImpl implements UserChallengeCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUserChallenge qUserChallenge = QUserChallenge.userChallenge;

    // 챌린지 등록 여부
    @Override
    public Optional<UserChallenge> exist(Long userId, Long challengeId) {
        UserChallenge uc = jpaQueryFactory
                .selectFrom(qUserChallenge)
                .where(qUserChallenge.user.userId.eq(userId),
                        qUserChallenge.challenge.challengeId.eq(challengeId))
                .fetchFirst();

        return Optional.ofNullable(uc);
    }

}
