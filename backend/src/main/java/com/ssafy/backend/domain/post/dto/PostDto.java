package com.ssafy.backend.domain.post.dto;

import com.ssafy.backend.domain.post.entity.Category;
import com.ssafy.backend.domain.post.entity.Post;
import com.ssafy.backend.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Builder
public class PostDto {
    private Long postId;
//    private User user;
    private String nickname;
    private String title;
    private String content;
    private Category category;
    private boolean isDeleted;
    private int hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /* Dto -> Entity */
    public Post toEntity(){
        return Post.builder()
                .postId(postId)
                //.user(user)
                .title(title)
                .content(content)
                .category(category)
                .isDeleted(isDeleted)
                .hit(hit)
                .build();
    }

    /* Entity -> Dto */
    public static PostDto toDto(Post post){
        return PostDto.builder()
                .postId(post.getPostId())
                //.user(post.getUser())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .isDeleted(post.isDeleted())
                .hit(post.getHit())
                .build();
    }
}
