package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.dto.RoutineTrainingRequestDto;
import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoutineTrainingListRepository extends JpaRepository<RoutineTrainingList, Long> {
    List<RoutineTrainingList> findAllByRoutineRoutineId(Long routineId);

}
