package com.ssafy.backend.domain.comment.service;

import com.ssafy.backend.domain.challenge.entity.Challenge;
import com.ssafy.backend.domain.challenge.repository.ChallengeRepository;
import com.ssafy.backend.domain.comment.dto.CommentRequestDto;
import com.ssafy.backend.domain.comment.dto.CommentResponseDto;
import com.ssafy.backend.domain.comment.entity.Comment;
import com.ssafy.backend.domain.comment.repository.CommentRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    // 챌린지 댓글 등록
    @Override
    @Transactional
    public Comment writeComment(Long challengeId, CommentRequestDto requestDto) {

        User user = userRepository.getReferenceById(requestDto.getUserId());
        Challenge challenge = challengeRepository.getReferenceById(challengeId);

        Comment comment = Comment
                .builder()
                .content(requestDto.getContent())
                .user(user)
                .challenge(challenge)
                .build();

        if (requestDto.getParentId() != null) {
            Comment parent = commentRepository.getReferenceById(requestDto.getParentId());
            comment.updateParent(parent);
        }

        return commentRepository.save(comment);
    }

    // 챌린지 댓글 목록
    @Override
    @Transactional
    public List<CommentResponseDto> viewComments(Long challengeId) {

        List<Comment> comments = commentRepository.findByChallengeId(challengeId);

        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        Map<Long, CommentResponseDto> commentDtoHashMap = new HashMap<>();

        comments.forEach(c -> {
            CommentResponseDto commentResponseDto = CommentResponseDto.toDto(c);
            commentDtoHashMap.put(commentResponseDto.getCommentId(), commentResponseDto);

            if (c.getParent() != null) {
                commentDtoHashMap.get(c.getParent().getCommentId()).getChildren().add(commentResponseDto);
            } else {
                commentResponseDtoList.add(commentResponseDto);
            }
        });

        return commentResponseDtoList;
    }

    // 챌린지 댓글 수정
    @Override
    @Transactional
    public void updateComment(Long commentId, CommentRequestDto requestDto) {

        Comment comment = commentRepository.getReferenceById(commentId);
        comment.updateContent(requestDto.getContent());
    }

    // 챌린지 댓글 삭제
    @Override
    @Transactional
    public void deleteComment(Long commentId) {

        Comment comment = commentRepository.findCommentByIdWithParent(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 ID " + commentId + "를 찾을 수 없습니다."));

        if (comment.getChildren().isEmpty()) { // 자식이 없으면 삭제 가능한 조상 댓글 찾아서 삭제
            commentRepository.delete(getDeletableAncestorComment(comment));
        } else { // 자식이 있으면 상태만 변경
            comment.changeIsDeleted(true);
        }
    }

    private Comment getDeletableAncestorComment(Comment comment) {
        Comment parent = comment.getParent(); // 현재 댓글의 부모
        if (parent != null && parent.getChildren().size() == 1 && parent.isDeleted()) {
            // 부모가 있고, 부모의 자식이 1개(지금삭제하는 댓글)이고, 부모의 삭제 상태가 TRUE인 댓글이라면 재귀
            return getDeletableAncestorComment(parent);
        }
        return comment; // 삭제해야하는 댓글 반환
    }
}
