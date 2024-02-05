package com.ssafy.backend.domain.training.controller;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.dto.UserTrainingRequestListDto;
import com.ssafy.backend.domain.training.service.TrainingService;
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

    // 운동 리스트(검색, 카테고리)
    @GetMapping("/list")
    public ResponseEntity<?> searchTraining(@RequestParam("category") String category,
                                            @RequestParam("keyword") String keyword) {

        log.info("운동 리스트 api 들어오나?");

        List<TrainingResponseDto> list = trainingService.searchTraining(category, keyword);

        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    // 운동 휴식여부
    @GetMapping("/rest")
    public ResponseEntity<?> checkRest(@RequestParam("user_id") Long userId,
                                       @RequestParam("year") int year,
                                       @RequestParam("month") int month,
                                       @RequestParam("day") int day
    ) {

        boolean flag = trainingService.checkRest(userId, year, month, day);

        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

    // 운동 휴식등록
    @PostMapping("/rest")
    public ResponseEntity<?> takeRest(@RequestParam("user_id") Long userId,
                                      @RequestParam("year") int year,
                                      @RequestParam("month") int month,
                                      @RequestParam("day") int day
    ) {

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
                                        @RequestParam("day") int day
    ) {

        try {
            log.info("운동 휴식해제 들어오나?");
            trainingService.removeRest(userId, year, month, day);

            return new ResponseEntity<>("휴식 해제 성공!", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }

    }

    // 운동 저장
//    @PostMapping
//    public ResponseEntity<?> saveTrainings(@RequestBody List<UserTrainingRequestDto> requestDtoList) {
//        log.info("운동 저장 들어왔나?");
//        log.info("{}", requestDtoList);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    // 운동 저장
    @PostMapping
    public ResponseEntity<?> saveTrainings(@RequestBody UserTrainingRequestListDto requestListDto) {
        log.info("운동 저장 들어왔나?");
        log.info("{}", requestListDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
