package com.ssafy.backend.domain.comment.entity;

import com.ssafy.backend.domain.challenge.entity.Challenge;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

/**
 * 댓글 엔티티
 *
 * 챌린지 1 : N 댓글
 * 유저 1 : N 댓글
 *
 */

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"commentId"}, callSuper = false)
@NamedEntityGraph
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId; // 댓글 ID, BIGINT, PK

    @Column(nullable = false)
    private String content; // 내용, VARCHAR(255), NOT NULL

    @ColumnDefault("FALSE")
    @Column(nullable = false)
    private boolean isDeleted; // 삭제여부, BOOLEAN, NOTNULL, DEFAULT FALSE

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user; // 회원 ID, BIGINT, FK, NOT NULL

    @ManyToOne(optional = false)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge; // 챌린지 ID, BIGINT, FK, NOT NULL

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @Builder.Default
    @ToString.Exclude
    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<Comment> children = new ArrayList<>();

    public void updateParent(Comment comment) {
        this.parent = comment;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void changeIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

}
