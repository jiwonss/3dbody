package com.ssafy.backend.domain.challenge.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.entity.QChallenge;
import com.ssafy.backend.domain.challenge.entity.QUserChallenge;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.stream.Collectors;

public class ChallengeCustomRepositoryImpl implements ChallengeCustomRepository {

    JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QUserChallenge qUserChallenge = QUserChallenge.userChallenge;

    public ChallengeCustomRepositoryImpl(EntityManager em) {
        jpaQueryFactory = new JPAQueryFactory(em);
    }

    // 참여중인 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> findChallengeWithUserChallenge(Long userId) {

        return jpaQueryFactory.selectFrom(qChallenge)
                .innerJoin(qUserChallenge)
                .on(qChallenge.challengeId.eq(qUserChallenge.challenge.challengeId))
                .where(qUserChallenge.user.userId.eq(userId))
                .fetch().stream().map(ChallengeListResponseDto::toDto).collect(Collectors.toList());
    }
}
