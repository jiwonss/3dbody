package com.ssafy.backend.domain.routine.service;

import com.ssafy.backend.domain.routine.dto.RoutineDto;
import com.ssafy.backend.domain.routine.dto.RoutineTrainingRequestDto;
import com.ssafy.backend.domain.routine.dto.RoutineTrainingResponseDto;

import java.util.List;

public interface RoutineService {

    public List<RoutineDto> routineList(Long userId);
    public void saveRoutine(RoutineDto routineDto);
    public void updateRoutine(Long routineId, String newTitle);
    public List<RoutineTrainingResponseDto> detailRoutine(Long routineId);
    public void addSet(RoutineTrainingRequestDto requestDto);
}
