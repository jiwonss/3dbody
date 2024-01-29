package com.ssafy.backend.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentRequestDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("parent_id")
    private Long parentId;

    private String content;

}
