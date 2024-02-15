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

    //루틴 운동들 중에서 가장 마지막 세트를 찾아서 반환
    @Override
    public RoutineTrainingList findLastOneWithRoutineIdAndTrainingId(Long routineId, Long trainingId){
        return jpaQueryFactory.selectFrom(qRoutineTraining)
                .where(qRoutineTraining.routine.routineId.eq(routineId),
                        qRoutineTraining.training.trainingId.eq(trainingId))
                .orderBy(qRoutineTraining.sets.desc())
                .fetchFirst();
    }

    //운동 삭제 메서드
    @Override
    public void deleteWithRoutineIdAndTrainingId(Long routineId, Long trainingId){
        jpaQueryFactory.delete(qRoutineTraining)
                .where(qRoutineTraining.routine.routineId.eq(routineId),
                        qRoutineTraining.training.trainingId.eq(trainingId))
                .execute();
    }

    //운동 삭제 후 남은 운동 sequence 1씩 감소
    @Override
    public void updateWithRoutineIdAndSequence(Long routineId, int sequence){
        jpaQueryFactory.update(qRoutineTraining)
                .set(qRoutineTraining.sequence, qRoutineTraining.sequence.subtract(1))
                .where(qRoutineTraining.routine.routineId.eq(routineId),
                        qRoutineTraining.sequence.gt(sequence))
                .execute();
    }
}
