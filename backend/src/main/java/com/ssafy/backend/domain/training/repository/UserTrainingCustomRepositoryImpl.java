package com.ssafy.backend.domain.training.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.entity.QUserTraining;
import com.ssafy.backend.domain.training.entity.UserTraining;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public class UserTrainingCustomRepositoryImpl implements UserTrainingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUserTraining qUserTraining = QUserTraining.userTraining;

    // 회원ID, 날짜 기반 운동 정보 조회(운동 조회, 운동 추가)
    @Override
    public List<UserTraining> findAllWithUserIdAndDate(Long userId, LocalDate date) {

        return jpaQueryFactory.selectFrom(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId), qUserTraining.date.eq(date))
                .orderBy(qUserTraining.sequence.asc(), qUserTraining.sets.asc())
                .fetch();
    }

    // kg, count 데이터 수정
    @Override
    public void updateWithUserTrainingIdAndKgAndCount(Long userTrainingId, float kg, int count) {
        jpaQueryFactory.update(qUserTraining)
                .set(qUserTraining.kg, kg)
                .set(qUserTraining.count, count)
                .where(qUserTraining.userTrainingId.eq(userTrainingId))
                .execute();
    }

    // 해당 날짜, 회원, 운동 중에서 가장 마지막 세트를 찾아서 반환시켜주는 메서드
    @Override
    public UserTraining findLastOneWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date) {
        return jpaQueryFactory.selectFrom(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId),
                        qUserTraining.training.trainingId.eq(trainingId),
                        qUserTraining.date.eq(date))
                .orderBy(qUserTraining.sets.desc())
                .fetchFirst();

    }

    // 운동 삭제 메서드
    @Override
    public void deleteWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date) {
        jpaQueryFactory.delete(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId),
                        qUserTraining.training.trainingId.eq(trainingId),
                        qUserTraining.date.eq(date))
                .execute();
    }

    // 운동 삭제후 남은 운동 sequence 1씩 감소시켜주는 메서드
    @Override
    public void updateWithUserIdAndDateAndSequence(Long userId, LocalDate date, int sequence) {
        jpaQueryFactory.update(qUserTraining)
                .set(qUserTraining.sequence, qUserTraining.sequence.subtract(1))
                .where(qUserTraining.user.userId.eq(userId),
                        qUserTraining.date.eq(date),
                        qUserTraining.sequence.gt(sequence))
                .execute();
    }

    // 회원 ID 기반 운동 정보 조회(운동 조회)
    @Override
    public List<UserTraining> findAllWithUserId(Long userId) {
        return jpaQueryFactory.selectFrom(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId))
                .orderBy(qUserTraining.date.asc(), qUserTraining.sequence.asc(), qUserTraining.sets.asc())
                .fetch();
    }
}
