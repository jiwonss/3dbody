package com.ssafy.backend.domain.Post.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@Builder

public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // @ManyToOne
    // private User user; // 작성자ID

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Category category;
    private boolean isDeleted;

    @ColumnDefault("0")
    private int hit;
}
