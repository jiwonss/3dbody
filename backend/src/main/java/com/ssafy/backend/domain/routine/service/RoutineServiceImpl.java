package com.ssafy.backend.domain.routine.service;

import com.ssafy.backend.domain.routine.dto.RoutineDto;
import com.ssafy.backend.domain.routine.entity.Routine;
import com.ssafy.backend.domain.routine.repository.RoutineRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoutineServiceImpl implements RoutineService{

    final RoutineRepository routineRepository;
    final UserRepository userRepository;
    //나만의 루틴 목록
    @Override
    public List<RoutineDto> routineList(Long userId){
        List<Routine> routineEntities = routineRepository.findAllByUserUserId(userId);
        List<RoutineDto> routineDtoList = routineEntities.stream()
                .map(RoutineDto::toDto)
                .collect(Collectors.toList());
        return routineDtoList;
    }
    //나만의 루틴 추가
    @Override
    public void saveRoutine(RoutineDto routineDto){
        User user = userRepository.findById(routineDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("userId 없음"));
        Routine routine = new Routine();
        routine.setUser(user);
        routine.setTitle(routineDto.getTitle());
        routineRepository.save(routine);
    }
    //나만의 루틴 상세 편집
    @Override
    public void updateRoutine(Long routineId, String newTitle){
        Routine routine = routineRepository.findById(routineId)
                .orElseThrow(() -> new IllegalArgumentException("루틴아이디없음 " + routineId));
        routine.setTitle(newTitle);
        routineRepository.save(routine);
    }

    //나만의 루틴 상세 삭제

    //루틴 상세 보기

    //루틴 상세 보기 편집

    //루틴 생성
}
