package com.ssafy.backend.domain.post.dto;

import com.ssafy.backend.domain.post.entity.Category;
import com.ssafy.backend.domain.post.entity.Post;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostListDto {
    private LocalDateTime createdAt;
    private Category category;
    private String title;

    public static PostListDto toDto(Post post){
        return PostListDto.builder()
                .createdAt(post.getCreatedAt())
                .category(post.getCategory())
                .title(post.getTitle())
                .build();
    }
}
