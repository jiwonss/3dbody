package com.ssafy.backend.domain.Post.entity;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Builder
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

}
