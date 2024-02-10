package com.ssafy.backend.domain.routine.service;

import com.ssafy.backend.domain.routine.dto.*;
import com.ssafy.backend.domain.training.dto.SetCreateRequestDto;
import com.ssafy.backend.domain.training.dto.UserTrainingDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

public interface RoutineService {

    public List<RoutineDto> routineList(Long userId);
    public void saveRoutine(RoutineDto routineDto);
    public void updateRoutine(Long routineId, String newTitle);
    public GetTrainingResponseDto getTrainings(Long routineId);
    public void addSet(SetCreateRoutineRequestDto requestDto);
    public void saveRoutineTrainings(Long routineId, List<Long> trainings);
    public void removeSet(Long routineTrainingListId);
    public void removeRoutine(Long routineId);
    public void updateSet(RoutineSetRequestDto requestDto);
    public void removeTraining(Long routineId, Long TrainingId);
    public void addTraining(List<UserTrainingDto> userTrainingDtoList, Long routineId); //운동불러와서 루틴에 저장하기
}
