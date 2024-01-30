package com.ssafy.backend.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CommentResponseDto {

    @JsonProperty("comment_id")
    private Long commentId;

    private String content;

    /**
     * UserDto 시작
     */
    @JsonProperty("user_id")
    private Long userId;

    private String email;

    private String nickname;

    @JsonProperty("profile_image")
    private String profileImage;
    /**
     * UserDto 끝
     */

    @Builder.Default
    private List<CommentResponseDto> children = new ArrayList<>();

    public static CommentResponseDto toDto(Comment comment) {

        CommentResponseDto dto = CommentResponseDto
                .builder()
                .commentId(comment.getCommentId())
                .build();

        if (comment.isDeleted()) { // 삭제된 댓글인 경우

            dto.setContent("삭제된 댓글입니다.");

        } else {

            dto.setContent(comment.getContent());
            dto.setUserId(comment.getUser().getUserId());
            dto.setEmail(comment.getUser().getEmail());
            dto.setNickname(comment.getUser().getNickname());
            dto.setProfileImage(comment.getUser().getProfileImage());

        }

        return dto;
    }

}
