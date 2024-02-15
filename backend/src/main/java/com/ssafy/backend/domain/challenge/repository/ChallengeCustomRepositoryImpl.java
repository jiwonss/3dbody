package com.ssafy.backend.domain.challenge.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.entity.QChallenge;
import com.ssafy.backend.domain.challenge.entity.QUserChallenge;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ChallengeCustomRepositoryImpl implements ChallengeCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QChallenge qChallenge = QChallenge.challenge;
    QUserChallenge qUserChallenge = QUserChallenge.userChallenge;

    // 참여중인 챌린지 목록
    @Override
    public List<ChallengeListResponseDto> findChallengeWithUserChallenge(Long userId) {

        return jpaQueryFactory.selectFrom(qChallenge)
                .innerJoin(qUserChallenge)
                .on(qChallenge.challengeId.eq(qUserChallenge.challenge.challengeId))
                .where(qUserChallenge.user.userId.eq(userId))
                .orderBy(qChallenge.endDate.asc())
                .fetch().stream().map(ChallengeListResponseDto::toDto).collect(Collectors.toList());
    }

    // 참가자수 1증가
    @Override
    public void addEntry(Long challengeId) {
        jpaQueryFactory.update(qChallenge)
                .set(qChallenge.entry, qChallenge.entry.add(1))
                .where(qChallenge.challengeId.eq(challengeId))
                .execute();
    }

    // 참가자수 1감소
    @Override
    public void subEntry(Long challengeId) {
        jpaQueryFactory.update(qChallenge)
                .set(qChallenge.entry, qChallenge.entry.subtract(1))
                .where(qChallenge.challengeId.eq(challengeId))
                .execute();
    }

    // 조회수 1증가
    @Override
    public void updateHitWithChallengeId(Long challengeId) {
        jpaQueryFactory.update(qChallenge)
                .set(qChallenge.hit, qChallenge.hit.add(1))
                .where(qChallenge.challengeId.eq(challengeId))
                .execute();
    }
}
