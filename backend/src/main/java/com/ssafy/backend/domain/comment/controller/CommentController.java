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
    @PostMapping("/{challenge_id}")
    public ResponseEntity<?> writeComment(@PathVariable("challenge_id") Long challengeId,
                                          @RequestBody CommentRequestDto requestDto) {
        try {
            Comment comment = commentService.writeComment(challengeId, requestDto);
            return new ResponseEntity<>("댓글 등록 성공! " + comment, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 댓글 목록
    @GetMapping("/{challenge_id}")
    public ResponseEntity<?> viewComments(@PathVariable("challenge_id") Long challengeId) {
        try {
            List<CommentResponseDto> commentList = commentService.viewComments(challengeId);
            return new ResponseEntity<>(commentList, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 댓글 수정
    @PutMapping("/{comment_id}")
    public ResponseEntity<?> updateComments(@PathVariable("comment_id") Long commentId,
                                            @RequestBody CommentRequestDto requestDto) {
        try {
            commentService.updateComment(commentId, requestDto);
            return new ResponseEntity<>("챌린지 댓글 수정 성공!", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 챌린지 댓글 삭제
    @DeleteMapping("/{comment_id}")
    public ResponseEntity<?> deleteComment(@PathVariable("comment_id") Long commentId) {
        try {
            commentService.deleteComment(commentId);
            return new ResponseEntity<>("챌린지 댓글 삭제 성공! 댓글 ID = " + commentId, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        return new ResponseEntity<>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
