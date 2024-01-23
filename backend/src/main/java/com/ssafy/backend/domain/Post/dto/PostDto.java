package com.ssafy.backend.domain.Post.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
@Getter
@Builder
public class PostDto {
    private Long postId;
    //private UserDto userDto;
    private String title;
    private String content;
    private String category;
    private boolean is_deleted;
    private int hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
}
