package com.ssafy.backend.domain.training.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
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
    public List<UserTraining> findAllWithUserIdAndDate(Long userId, int year, int month, int day) {

        LocalDate date = LocalDate.of(year, month, day);

        return jpaQueryFactory.selectFrom(qUserTraining)
                .where(qUserTraining.user.userId.eq(userId), qUserTraining.date.eq(date))
                .orderBy(qUserTraining.sequence.asc(), qUserTraining.sets.asc())
                .fetch();
    }

    @Override
    public void deleteWithUserIdAndTrainingIdAndDate(UserTrainingRequestDto requestDto) {

        jpaQueryFactory.delete(qUserTraining)
                .where(qUserTraining.user.userId.eq(requestDto.getUserId()),
                        qUserTraining.training.trainingId.eq(requestDto.getTrainingId()),
                        qUserTraining.date.eq(requestDto.getDate()),
                        qUserTraining.sequence.eq(requestDto.getSequence()),
                        qUserTraining.sets.eq(requestDto.getSets()))
                .execute();
    }
}
