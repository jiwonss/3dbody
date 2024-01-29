package com.ssafy.backend.domain.post.entity;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 작성자ID가지고옴

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    private boolean isDeleted;

    @ColumnDefault("0")
    private int hit;

    @Builder
    public Post(Long postId, User user, String title, String content, Category category, boolean isDeleted, int hit) {
        this.postId = postId;
        this.user = user;
        this.title = title;
        this.content = content;
        this.category = category;
        this.isDeleted = isDeleted;
        this.hit = hit;
    }
}
