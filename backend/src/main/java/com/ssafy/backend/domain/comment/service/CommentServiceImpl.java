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
    public Comment writeComment(CommentRequestDto requestDto) {

        log.info("챌린지 댓글 등록 비즈니스 로직 수행 - 요청 파라미터 : {}", requestDto);

        User user = userRepository.getReferenceById(requestDto.getUserId());
        log.info("유저 정보 {}", user);
        Challenge challenge = challengeRepository.getReferenceById(requestDto.getChallengeId());
        log.info("챌린지 정보 {}", challenge);

        Comment comment = Comment
                .builder()
                .content(requestDto.getContent())
                .user(user)
                .challenge(challenge)
                .build();

        if (requestDto.getParentId() != null) {
            Comment parent = commentRepository.getReferenceById(requestDto.getParentId());
            log.info("부모댓글 정보 {}", parent);
            comment.updateParent(parent);
        }

        log.info("챌린지 댓글 등록 비즈니스 로직 수행 결과 - 댓글 데이터 정보 : {}", comment);

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
}
