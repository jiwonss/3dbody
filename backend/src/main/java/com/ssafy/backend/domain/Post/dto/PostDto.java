package com.ssafy.backend.domain.Post.dto;

import com.ssafy.backend.domain.Post.entity.Category;
import com.ssafy.backend.domain.Post.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long postId;
    //private UserDto userDto;
    private String title;
    private String content;
    private Category category;
    private boolean isDeleted;
    private int hit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /* Dto -> Entity */
    public static Post toEntity(){
        Post post = Post.builder()
                .postId(postId)
                .title(title)
                .content(content)
                .category(category)
                .isDeleted(isDeleted)
                .hit(hit)
                .build();
        return post;
    }

    /* Entity -> Dto */
    public static PostDto toDto(Post post){
        PostDto dto = PostDto.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .isDeleted(post.isDeleted())
                .hit(post.getHit())
                .build();
        return dto;
    }
}
