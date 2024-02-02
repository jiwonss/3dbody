package com.ssafy.backend.domain.training.controller;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.service.TrainingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

}
