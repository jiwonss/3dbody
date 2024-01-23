package com.ssafy.backend.domain.Post.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostDto {
    private Long postId;
    private Long userId;
    private String title;
    private String content;
    private String category;
    private boolean is_deleted;
    private int hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
}
