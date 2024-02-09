package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;

import java.util.List;

public interface RoutineTrainingCustomRepository {

    //루틴 운동 상세 조회
    List<RoutineTrainingList> findAllWithRoutineId(Long routineId);
    //루틴 운동들 중에서 가장 마지막 세트를 찾아서 반환
    public RoutineTrainingList findLastOneWithRoutineIdAndTrainingId(Long routineId, Long trainingId);
    //운동 삭제 메서드
    public void deleteWithRoutineIdAndTrainingId(Long routineId, Long trainingId);
    //운동 삭제 후 남은 운동 sequence 1씩 감소
    public void updateWithRoutineIdAndSequence(Long routineId, int sequence);
}
