package com.ssafy.backend.domain.comment.controller;

import com.ssafy.backend.domain.comment.dto.CommentRequestDto;
import com.ssafy.backend.domain.comment.dto.CommentResponseDto;
import com.ssafy.backend.domain.comment.entity.Comment;
import com.ssafy.backend.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 챌린지 댓글 등록
    @PostMapping
    public ResponseEntity<?> writeComment(@RequestBody CommentRequestDto requestDto) {
        try {

            log.info("챌린지 댓글 등록 API 호출 - 요청 데이터 : {}", requestDto);

            Comment comment = commentService.writeComment(requestDto);

            return new ResponseEntity<>("댓글 등록 성공! " + comment, HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 댓글 목록
    @GetMapping
    public ResponseEntity<?> viewComments(@RequestParam("challenge_id") Long challengeId) {

        try {

            List<CommentResponseDto> commentList = commentService.viewComments(challengeId);

            return new ResponseEntity<>(commentList, HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }

    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
