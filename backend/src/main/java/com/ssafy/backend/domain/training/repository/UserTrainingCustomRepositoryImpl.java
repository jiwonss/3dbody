package com.ssafy.backend.domain.training.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.dto.SetUpdateRequestDto;
import com.ssafy.backend.domain.training.entity.QUserTraining;
import com.ssafy.backend.domain.training.entity.UserTraining;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public class UserTrainingCustomRepositoryImpl implements UserTrainingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUserTraining qUserTraining = QUserTraining.userTraining;

    @Override
    public List<UserTraining> findAllWithUserIdAndDate(Long userId, LocalDate date) {

        return jpaQueryFactory.selectFrom(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId), qUserTraining.date.eq(date))
                .orderBy(qUserTraining.sequence.asc(), qUserTraining.sets.asc())
                .fetch();
    }

    @Override
    public void updateWithUserTrainingIdAndKgAndCount(SetUpdateRequestDto requestDto) {
        jpaQueryFactory.update(qUserTraining)
                .set(qUserTraining.kg, requestDto.getKg())
                .set(qUserTraining.count, requestDto.getCount())
                .where(qUserTraining.userTrainingId.eq(requestDto.getUserTrainingId()))
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

    @Override
    public void deleteWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date) {
        jpaQueryFactory.delete(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId),
                        qUserTraining.training.trainingId.eq(trainingId),
                        qUserTraining.date.eq(date))
                .execute();
    }

    @Override
    public void updateWithUserIdAndDateAndSequence(Long userId, LocalDate date, int sequence) {
        jpaQueryFactory.update(qUserTraining)
                .set(qUserTraining.sequence, qUserTraining.sequence.subtract(1))
                .where(qUserTraining.user.userId.eq(userId),
                        qUserTraining.date.eq(date),
                        qUserTraining.sequence.gt(sequence))
                .execute();
    }
}
