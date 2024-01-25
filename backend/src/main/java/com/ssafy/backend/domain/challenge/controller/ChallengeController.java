package com.ssafy.backend.domain.challenge.controller;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.service.ChallengeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/challenge")
public class ChallengeController {

    private ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    // 진행중인 챌린지 목록
    @GetMapping("/list/proceeding")
    public ResponseEntity<?> proceedingChallengeList() {
        List<ChallengeListResponseDto> list = challengeService.getProceedingChallengeList();
        log.info("진행중인 챌린지 목록 : {}", list);
        return new ResponseEntity<List<ChallengeListResponseDto>>(list, HttpStatus.OK);
    }

    @GetMapping("/list/finished")
    public ResponseEntity<?> finishedChallengeList() {
        List<ChallengeListResponseDto> list = challengeService.getFinishedChallengeList();
        log.info("종료된 챌린지 목록 : {}", list);
        return new ResponseEntity<List<ChallengeListResponseDto>>(list, HttpStatus.OK);
    }

}
