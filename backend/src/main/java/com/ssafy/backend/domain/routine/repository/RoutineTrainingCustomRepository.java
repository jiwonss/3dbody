package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;

import java.util.List;

public interface RoutineTrainingCustomRepository {

    //루틴 운동 상세 조회
    List<RoutineTrainingList> findAllWithRoutineId(Long routineId);
}
