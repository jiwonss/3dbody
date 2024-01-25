package com.ssafy.backend.domain.challenge.controller;

import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.service.ChallengeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    // 참여가능 챌린지 목록
    @GetMapping("/list/proceeding")
    public ResponseEntity<?> proceedingChallengeList() {
        List<ChallengeListResponseDto> list = challengeService.getProceedingChallengeList();
        log.info("참여가능 챌린지 목록 : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 참여중 챌린지 목록
    @GetMapping("/list/{userId}")
    public ResponseEntity<?> joiningChallengeList(@PathVariable("userId") Long userId) {
        List<ChallengeListResponseDto> list = challengeService.getJoiningChallengeList(userId);
        log.info("참여중 챌린지 목록 : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 종료된 챌린지 목록
    @GetMapping("/list/finished")
    public ResponseEntity<?> finishedChallengeList() {
        List<ChallengeListResponseDto> list = challengeService.getFinishedChallengeList();
        log.info("종료된 챌린지 목록 : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
