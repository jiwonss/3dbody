package com.ssafy.backend.domain.challenge.repository;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long>, ChallengeCustomRepository {

    // 참여가능 챌린지 목록
    @Query("select new com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto(c.challengeId, c.title, c.summary, c.thumbnail, c.entry, c.hit, c.user.userId, c.user.nickname, c.startDate, c.endDate) " +
            "from Challenge c inner join c.user u " +
            "where c.endDate > :now " +
            "order by c.endDate asc")
    List<ChallengeListResponseDto> findAllByEndDateIsAfter(@Param("now") LocalDateTime now);

    // 종료된 챌린지 목록
    @Query("select new com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto(c.challengeId, c.title, c.summary, c.thumbnail, c.entry, c.hit, c.user.userId, c.user.nickname, c.startDate, c.endDate) " +
            "from Challenge c inner join c.user u " +
            "where c.endDate < :now")
    List<ChallengeListResponseDto> findAllByEndDateIsBefore(@Param("now") LocalDateTime now);

}
