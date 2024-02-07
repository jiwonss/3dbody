package com.ssafy.backend.domain.training.controller;

import com.ssafy.backend.domain.training.dto.SetRequestDto;
import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.dto.UserTrainingResponseDto;
import com.ssafy.backend.domain.training.service.TrainingService;
import com.ssafy.backend.domain.training.service.UserTrainingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/management/training")
public class TrainingController {

    private final TrainingService trainingService;
    private final UserTrainingService userTrainingService;

    // 운동 휴식여부
    @GetMapping("/rest")
    public ResponseEntity<?> checkRest(@RequestParam("user_id") Long userId,
                                       @RequestParam("year") int year,
                                       @RequestParam("month") int month,
                                       @RequestParam("day") int day) {
        boolean flag = trainingService.checkRest(userId, year, month, day);
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

    // 운동 휴식등록
    @PostMapping("/rest")
    public ResponseEntity<?> takeRest(@RequestParam("user_id") Long userId,
                                      @RequestParam("year") int year,
                                      @RequestParam("month") int month,
                                      @RequestParam("day") int day) {
        try {
            trainingService.takeRest(userId, year, month, day);
            return new ResponseEntity<>("휴식 등록 성공!", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 운동 휴식해제
    @DeleteMapping("/rest")
    public ResponseEntity<?> removeRest(@RequestParam("user_id") Long userId,
                                        @RequestParam("year") int year,
                                        @RequestParam("month") int month,
                                        @RequestParam("day") int day) {
        try {
            log.info("운동 휴식해제 들어오나?");
            trainingService.removeRest(userId, year, month, day);
            return new ResponseEntity<>("휴식 해제 성공!", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 운동 리스트(검색, 카테고리)
    @GetMapping("/list")
    public ResponseEntity<?> searchTraining(@RequestParam("category") String category,
                                            @RequestParam("keyword") String keyword) {
        log.info("운동 리스트 api 들어오나?");
        List<TrainingResponseDto> list = trainingService.searchTraining(category, keyword);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 운동 조회(특정 날짜&회원)
    @GetMapping
    public ResponseEntity<?> getTrainings(@RequestParam("user_id") Long userId,
                                          @RequestParam("year") int year,
                                          @RequestParam("month") int month,
                                          @RequestParam("day") int day) {
        log.info("운동 조회 들어왔나?");
        List<UserTrainingResponseDto> list = userTrainingService.getTrainings(userId, year, month, day);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 운동 추가
    @PostMapping
    public ResponseEntity<?> saveTrainings(@RequestParam("user_id") Long userId,
                                           @RequestParam("year") int year,
                                           @RequestParam("month") int month,
                                           @RequestParam("day") int day,
                                           @RequestBody List<Long> trainings) {
        log.info("운동 추가 들어왔나?");
        log.info("{}", trainings);
        log.info("userId={}, 오늘날짜: {}-{}-{}", userId, year, month, day);
        userTrainingService.saveTrainings(userId, year, month, day, trainings);
        return new ResponseEntity<>(year + "-" + month + "-" + day + ", 회원ID = " + userId + " 운동 추가 성공!", HttpStatus.OK);
    }

    // 운동 완료 여부 수정(세트별로)
    @PutMapping("/user_training/{user_training_id}")
    public ResponseEntity<?> checkTraining(@PathVariable("user_training_id") Long userTrainingId) {
        userTrainingService.toggle(userTrainingId);
        return new ResponseEntity<>("운동 완료 여부 수정 완료", HttpStatus.OK);
    }

    // kg, count 데이터 수정
    @PutMapping("/set")
    public ResponseEntity<?> updateSet(@RequestBody SetRequestDto requestDto) {
        userTrainingService.updateSet(requestDto);
        return new ResponseEntity<>("kg, count 데이터 수정 완료!", HttpStatus.OK);
    }

    // 세트 추가
    @PostMapping("/set")
    public ResponseEntity<?> addSet(@RequestBody UserTrainingRequestDto requestDto) {
        log.info("세트 추가 요청 들어오나? {}", requestDto);
        userTrainingService.addSet(requestDto);
        return new ResponseEntity<>("새트 추가 완료.", HttpStatus.OK);
    }

    // 세트 삭제
    @DeleteMapping("/set")
    public ResponseEntity<?> removeSet(@RequestBody UserTrainingRequestDto requestDto) {
        log.info("세트 삭제 요청 들어옴? - {}", requestDto);
        userTrainingService.removeSet(requestDto);
        return new ResponseEntity<>("세트 삭제 완료.", HttpStatus.OK);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
