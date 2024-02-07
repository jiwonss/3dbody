package com.ssafy.backend.domain.routine.controller;

import com.ssafy.backend.domain.routine.dto.RoutineDto;
import com.ssafy.backend.domain.routine.dto.RoutineTrainingRequestDto;
import com.ssafy.backend.domain.routine.dto.RoutineTrainingResponseDto;
import com.ssafy.backend.domain.routine.service.RoutineService;
import com.ssafy.backend.global.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/management/routine")
public class RoutineController {

    private final RoutineService routineService;

    //나만의 루틴 목록
    @GetMapping("/{user_id}")
    public ResponseEntity<?> routineList(@PathVariable("user_id") Long userId){
        List<RoutineDto> routineDtoList = routineService.routineList(userId);
        return new ResponseEntity<>(routineDtoList, HttpStatus.OK);
    }
    //나만의 루틴 추가
    @PostMapping("/addroutine")
    public ResponseEntity<?> addRoutine(@RequestBody RoutineDto routineDto){
        log.info("controller들어와?");
        routineService.saveRoutine(routineDto);
        return ResponseEntity.ok(Response.success());
    }

    //나만의 루틴 이름 편집
    @PatchMapping("/update/{routine_id}")
    public ResponseEntity<?> updateRoutine(@PathVariable("routine_id") Long routineId, @RequestParam("title") String title){
        log.info("수정 들어와?");
        routineService.updateRoutine(routineId, title);
        return ResponseEntity.ok(Response.success());
    }

    //루틴 상세 보기
    @GetMapping("/detail/{routine_id}")
    public ResponseEntity<?> detailRoutine(@PathVariable("routine_id")Long routineId){
        List<RoutineTrainingResponseDto> routineTrainingList = routineService.detailRoutine(routineId);
        return new ResponseEntity<>(routineTrainingList, HttpStatus.OK);
    }

    // 루틴 세트 추가
    @PostMapping("/set")
    public ResponseEntity<?> addSet(@RequestBody RoutineTrainingRequestDto requestDto){
        routineService.addSet(requestDto);
        return ResponseEntity.ok(Response.success());
    }

    //루틴 운동 추가 (리스트로)
    @PostMapping
    public ResponseEntity<?> saveRoutineTrainings(@RequestParam("routine_id") Long routineId,
                                                  @RequestBody List<Long> trainings){
        routineService.saveRoutineTrainings(routineId, trainings);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // 루틴 세트 삭제
    @DeleteMapping("/set/{routine_training_list_id}")
    public ResponseEntity<?> removeSet(@PathVariable("routine_training_list_id") Long routineTrainingListId){
        routineService.removeSet(routineTrainingListId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    //나만의 루틴 상세 삭제(일단 스톱)

    //루틴 상세 보기 편집 kg, 횟수 수정

    //루틴 운동 생성
}

