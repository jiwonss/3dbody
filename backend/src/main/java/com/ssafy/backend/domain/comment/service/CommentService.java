package com.ssafy.backend.domain.comment.service;

import com.ssafy.backend.domain.comment.dto.CommentRequestDto;
import com.ssafy.backend.domain.comment.entity.Comment;

public interface CommentService {

    // 챌린지 댓글 등록
    Comment writeComment(CommentRequestDto requestDto);
}
