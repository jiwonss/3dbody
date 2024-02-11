package com.ssafy.backend.domain.routine.controller;

import com.ssafy.backend.domain.routine.dto.*;
import com.ssafy.backend.domain.routine.service.RoutineService;
import com.ssafy.backend.domain.training.dto.SetDto;
import com.ssafy.backend.domain.training.dto.UserTrainingDto;
import com.ssafy.backend.domain.training.service.UserTrainingService;
import com.ssafy.backend.global.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/management/routine")
public class RoutineController {

    private final RoutineService routineService;
    private final UserTrainingService userTrainingService;

    //나만의 루틴 목록
    @GetMapping("/{user_id}")
    public ResponseEntity<?> routineList(@PathVariable("user_id") Long userId) {
        List<RoutineDto> routineDtoList = routineService.routineList(userId);
        return new ResponseEntity<>(routineDtoList, HttpStatus.OK);
    }

    //나만의 루틴 추가
    @PostMapping("/addroutine")
    public ResponseEntity<?> addRoutine(@RequestBody RoutineDto routineDto) {
        log.info("controller들어와?");
        routineService.saveRoutine(routineDto);
        return ResponseEntity.ok(Response.success());
    }

    //나만의 루틴 이름 편집
    @PatchMapping("/update/{routine_id}")
    public ResponseEntity<?> updateRoutine(@PathVariable("routine_id") Long routineId, @RequestParam("title") String title) {
        log.info("수정 들어와?");
        routineService.updateRoutine(routineId, title);
        return ResponseEntity.ok(Response.success());
    }

    //루틴 상세 조희
    @GetMapping("/detail")
    public ResponseEntity<?> detailRoutine(@RequestParam("routine_id") Long routineId) {
//        List<RoutineTrainingResponseDto> routineTrainingList = routineService.detailRoutine(routineId);
//        return new ResponseEntity<>(routineTrainingList, HttpStatus.OK);
        GetTrainingResponseDto list = routineService.getTrainings(routineId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 루틴 세트 추가
    @PostMapping("/set")
    public ResponseEntity<?> addSet(@RequestBody SetCreateRoutineRequestDto requestDto) {
        routineService.addSet(requestDto);
        return ResponseEntity.ok(Response.success());
    }

    //루틴 운동 추가 (리스트로)
    @PostMapping
    public ResponseEntity<?> saveRoutineTrainings(@RequestParam("routine_id") Long routineId,
                                                  @RequestBody List<Long> trainings) {
        routineService.saveRoutineTrainings(routineId, trainings);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 루틴 세트 삭제
    @DeleteMapping("/set/{routine_training_list_id}")
    public ResponseEntity<?> removeSet(@PathVariable("routine_training_list_id") Long routineTrainingListId) {
        routineService.removeSet(routineTrainingListId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //나만의 루틴 상세 삭제
    @DeleteMapping("delete/{routine_id}")
    public ResponseEntity<?> removeRoutine(@PathVariable("routine_id") Long routineId) {

        routineService.removeRoutine(routineId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //루틴 상세 보기 편집 kg, 횟수 수정
    @PutMapping("/set")
    public ResponseEntity<?> updateSet(@RequestBody RoutineSetRequestDto requestDto) {
        routineService.updateSet(requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //운동 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> removeTraining(@RequestParam("routine_id") Long routineId, @RequestParam("training_id") Long trainingId) {
        routineService.removeTraining(routineId, trainingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //운동 불러와서 루틴에 그대로 저장하기
    @PostMapping("/add")
    public ResponseEntity<?> addTraining(@RequestParam("routine_id") Long routineId,
                                         @RequestBody List<UserTrainingDto> userTrainingDtoList) {
        try {

            routineService.addTraining(userTrainingDtoList, routineId);
            return new ResponseEntity<>("운동 추가", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    //해당 날짜에서 루틴 불러와서 루틴에 해당하는 데이터 추가하기
    @GetMapping("/addTrainings")
    public ResponseEntity<?> saveTrainings(@RequestParam("user_id") Long userId,
                                           @RequestParam("routine_id") Long routineId,
                                           @RequestParam("year") int year,
                                           @RequestParam("month") int month,
                                           @RequestParam("day") int day) {

        try {
            // 루틴에서 루틴 아이디에 해당하는 list 불러오기
            GetTrainingResponseDto list = routineService.getTrainings(routineId);
            log.info("list 보기 {}", list);

            // 불러온 list를 userTrainingDtoList에 저장
            List<UserTrainingDto> userTrainingDtoList = new ArrayList<>();

            int size = list.getRoutineTrainingList().size();

            for (int i = 0; i < size; i++) {
                UserTrainingDto userTrainingDto = new UserTrainingDto(); // Create a new instance

                // Set values for UserTrainingDto
                userTrainingDto.setUserId(userId);
                userTrainingDto.setTrainingId(list.getRoutineTrainingList().get(i).getTrainingId());
                userTrainingDto.setName(list.getRoutineTrainingList().get(i).getName());
                userTrainingDto.setCategory(list.getRoutineTrainingList().get(i).getCategory());
                userTrainingDto.setImage(list.getRoutineTrainingList().get(i).getImage());

                int setSize = list.getRoutineTrainingList().get(i).getSets().size();
                List<SetDto> setDtoList = new ArrayList<>();

                for (int j = 0; j < setSize; j++) {
                    SetDto setDto = new SetDto();
                    setDto.setKg(list.getRoutineTrainingList().get(i).getSets().get(j).getKg());
                    setDto.setCount(list.getRoutineTrainingList().get(i).getSets().get(j).getCount());

                    setDtoList.add(setDto);
                }

                userTrainingDto.setSets(setDtoList);

                userTrainingDtoList.add(userTrainingDto);
            }

            // userTraining에 저장
            userTrainingService.addTrainings(userTrainingDtoList, LocalDate.of(year, month, day));
            return new ResponseEntity<>("루틴에서 불러오기 성공", HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    private ResponseEntity<?> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

