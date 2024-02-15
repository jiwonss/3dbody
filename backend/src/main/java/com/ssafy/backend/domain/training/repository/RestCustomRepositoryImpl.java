package com.ssafy.backend.domain.training.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.entity.QRest;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RequiredArgsConstructor
public class RestCustomRepositoryImpl implements RestCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QRest qRest = QRest.rest;

    // 운동 휴식여부
    @Override
    public boolean existsRestWithUserIdAndYearAndMonthAndDay(Long userId, int year, int month, int day) {

        LocalDate date = LocalDate.of(year, month, day);

        Integer fetchOne = jpaQueryFactory.selectOne()
                .from(qRest)
                .where(qRest.user.userId.eq(userId), qRest.date.eq(date))
                .fetchFirst();
        return fetchOne != null;
    }

    // 운동 휴식해제
    @Override
    @Transactional
    public void deleteRestWithUserIdAndYearAndMonthAndDay(Long userId, int year, int month, int day) {

        LocalDate date = LocalDate.of(year, month, day);

        jpaQueryFactory.delete(qRest)
                .where(qRest.user.userId.eq(userId), qRest.date.eq(date))
                .execute();

    }
}
