package com.ssafy.backend.domain.challenge.controller;

import com.ssafy.backend.domain.challenge.dto.ChallengeDetailResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeListResponseDto;
import com.ssafy.backend.domain.challenge.dto.ChallengeRequestDto;
import com.ssafy.backend.domain.challenge.entity.Challenge;
import com.ssafy.backend.domain.challenge.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    // 참여가능 챌린지 목록
    @GetMapping("/list/proceeding")
    public ResponseEntity<?> proceedingChallengeList() {
        List<ChallengeListResponseDto> list = challengeService.getProceedingChallengeList();
        log.info("참여가능 챌린지 목록 : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 참여중 챌린지 목록
    @GetMapping("/list/{user_id}")
    public ResponseEntity<?> joiningChallengeList(@PathVariable("user_id") Long userId) {
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

    // 챌린지 상세 조회
    @GetMapping("/detail/{challenge_id}")
    public ResponseEntity<?> getChallengeDetail(@PathVariable("challenge_id") Long challengeId) {

        try {
            challengeService.addHit(challengeId);
            ChallengeDetailResponseDto dto = challengeService.getChallengeDetail(challengeId);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 정보 등록
    @PostMapping
    public ResponseEntity<?> registerChallenge(@RequestBody ChallengeRequestDto requestDto) {
        try {
            log.info("챌린지 정보 등록 - requestDto : {}", requestDto);
            Challenge challenge = challengeService.registerChallenge(requestDto);

            return new ResponseEntity<>("챌린지 등록 성공! " + challenge, HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 정보 수정
    @PutMapping("/{challenge_id}")
    public ResponseEntity<?> updateChallenge(@PathVariable("challenge_id") Long challengeId,
                                             @RequestBody ChallengeRequestDto requestDto) {
        try {
            log.info("챌린지 정보 수정 - requestDto : {}", requestDto);
            Challenge challenge = challengeService.updateChallenge(challengeId, requestDto);

            return new ResponseEntity<>("챌린지 수정 성공! " + challenge, HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 정보 삭제
    @DeleteMapping("/{challenge_id}")
    public ResponseEntity<?> deleteChallenge(@PathVariable("challenge_id") Long challengeId) {
        try {
            log.info("챌린지 정보 삭제 - 챌린지 ID = {}", challengeId);

            challengeService.deleteChallenge(challengeId);

            return new ResponseEntity<>("챌린지 삭제 성공! 삭제한 챌린지 ID = " + challengeId, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("에러! 챌린지 삭제 실패 " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 챌린지 참여 조회
    @GetMapping("/{challenge_id}/user/{user_id}")
    public ResponseEntity<?> checkChallenge(@PathVariable("challenge_id") Long challengeId,
                                            @PathVariable("user_id") Long userId) {
        try {
            return new ResponseEntity<>(challengeService.checkChallenge(challengeId, userId), HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 참여 신청
    @PostMapping("/{challenge_id}/user/{user_id}")
    public ResponseEntity<?> applyChallenge(@PathVariable("challenge_id") Long challengeId,
                                            @PathVariable("user_id") Long userId) {

        try {

            challengeService.applyChallenge(challengeId, userId);

            return new ResponseEntity<>("챌린지 참여 신청 성공!", HttpStatus.OK);

        } catch (Exception e) {

            return exceptionHandling(e);

        }

    }

    // 챌린지 참여 취소
    @DeleteMapping("/{challenge_id}/user/{user_id}")
    public ResponseEntity<?> leaveChallenge(@PathVariable("challenge_id") Long challengeId,
                                            @PathVariable("user_id") Long userId) {

        try {

            log.info("챌린지 참여 취소 api 들어왔나?");

            challengeService.leaveChallenge(challengeId, userId);

            return new ResponseEntity<>("챌린지 참여 취소 성공!", HttpStatus.OK);

        } catch (Exception e) {

            return exceptionHandling(e);

        }

    }

    // 에러 핸들링
    private ResponseEntity<String> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
