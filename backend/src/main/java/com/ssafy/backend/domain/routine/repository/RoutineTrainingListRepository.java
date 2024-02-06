package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineTrainingListRepository extends JpaRepository<RoutineTrainingList, Long> {
    List<RoutineTrainingList> findAllByRoutineRoutineId(Long routineId);
}
