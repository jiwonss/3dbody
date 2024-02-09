package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.dto.RoutineSetRequestDto;
import com.ssafy.backend.domain.routine.dto.RoutineTrainingRequestDto;
import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoutineTrainingListRepository extends JpaRepository<RoutineTrainingList, Long>, RoutineTrainingCustomRepository {
    @Query("SELECT r FROM RoutineTrainingList r WHERE r.routine.routineId = :routineId")
    List<RoutineTrainingList> findAllByroutineTrainingListRoutineId(@Param("routineId") Long routineId);

    List<RoutineTrainingList> findAllByRoutineRoutineId(Long routineId);
    @Transactional
    @Modifying
    @Query("DELETE FROM RoutineTrainingList r WHERE r.routine.routineId = :routineId")
    void deleteAllByRoutineId(@Param("routineId") Long routineId);

    @Transactional
    @Modifying
    @Query("UPDATE RoutineTrainingList r SET r.kg = :kg, r.count = :count WHERE r.RoutineTrainingListId = :RoutineTrainingListId")
    void updateWithRoutineTrainingListIdAndKgAndCount(@Param("RoutineTrainingListId") Long RoutineTrainingListId, @Param("kg") float kg, @Param("count") int count);

}
