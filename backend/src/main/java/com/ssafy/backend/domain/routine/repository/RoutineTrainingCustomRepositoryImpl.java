package com.ssafy.backend.domain.routine.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.routine.entity.QRoutineTrainingList;
import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class RoutineTrainingCustomRepositoryImpl implements RoutineTrainingCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    QRoutineTrainingList qRoutineTraining = QRoutineTrainingList.routineTrainingList;

    @Override
    public List<RoutineTrainingList> findAllWithRoutineId(Long routineId) {
        return jpaQueryFactory.selectFrom(qRoutineTraining)
                .where(qRoutineTraining.routine.routineId.eq(routineId))
                .orderBy(qRoutineTraining.sequence.asc(), qRoutineTraining.sets.asc())
                .fetch();
    }
}
