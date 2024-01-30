package com.ssafy.backend.domain.comment.service;

import com.ssafy.backend.domain.comment.dto.CommentRequestDto;
import com.ssafy.backend.domain.comment.dto.CommentResponseDto;
import com.ssafy.backend.domain.comment.entity.Comment;

import java.util.List;

public interface CommentService {

    // 챌린지 댓글 등록
    Comment writeComment(CommentRequestDto requestDto);

    // 챌린지 댓글 목록
    List<CommentResponseDto> viewComments(Long challengeId);

    // 챌린지 댓글 수정
    void updateComment(CommentRequestDto requestDto);
}
