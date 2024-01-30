package com.ssafy.backend.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.comment.entity.Comment;
import com.ssafy.backend.domain.comment.entity.QComment;
import jakarta.persistence.EntityManager;

import java.util.List;

public class CommentCustomRepositoryImpl implements CommentCustomRepository {

    JPAQueryFactory jpaQueryFactory;

    QComment qComment = QComment.comment;

    public CommentCustomRepositoryImpl(EntityManager em) {
        jpaQueryFactory = new JPAQueryFactory(em);
    }

    // 챌린지 댓글 목록
    @Override
    public List<Comment> findByChallengeId(Long challengeId) {
        return jpaQueryFactory.selectFrom(qComment)
                .leftJoin(qComment.parent).fetchJoin()
                .where(qComment.challenge.challengeId.eq(challengeId))
                .orderBy(qComment.parent.commentId.asc().nullsFirst(),
                        qComment.createdAt.asc())
                .fetch();
    }
}
