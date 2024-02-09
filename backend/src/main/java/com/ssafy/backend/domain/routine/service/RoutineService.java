package com.ssafy.backend.domain.routine.service;

import com.ssafy.backend.domain.routine.dto.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface RoutineService {

    public List<RoutineDto> routineList(Long userId);
    public void saveRoutine(RoutineDto routineDto);
    public void updateRoutine(Long routineId, String newTitle);
    public GetTrainingResponseDto getTrainings(Long routineId);
    public void addSet(RoutineTrainingRequestDto requestDto);
    public void saveRoutineTrainings(Long routineId, List<Long> trainings);
    public void removeSet(Long routineTrainingListId);
    public void removeRoutine(Long routineId);
    public void updateSet(RoutineSetRequestDto requestDto);
}
