package com.ssafy.backend.domain.routine.repository;

import com.ssafy.backend.domain.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    List<Routine> findAllByUserUserId(Long userId);
}
