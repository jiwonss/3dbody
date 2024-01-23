package com.ssafy.backend.domain.Post.entity;

import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String title;
    private String content;

    @Enumerated(EnumType.ORDINAL)
    private Category category;
    private boolean is_deleted;
    private int hit;
}
