package com.ssafy.backend.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.comment.entity.Comment;
import com.ssafy.backend.domain.comment.entity.QComment;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class CommentCustomRepositoryImpl implements CommentCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QComment qComment = QComment.comment;

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

    @Override
    public Optional<Comment> findCommentByIdWithParent(Long commentId) {

        Comment comment = jpaQueryFactory.select(qComment)
                .from(qComment)
                .leftJoin(qComment.parent).fetchJoin()
                .where(qComment.commentId.eq(commentId))
                .fetchOne();

        return Optional.ofNullable(comment);
    }

    // 챌린지 댓글 삭제
    @Override
    public void deleteAllByChallengeId(Long challengeId) {
        jpaQueryFactory.delete(qComment)
                .where(qComment.challenge.challengeId.eq(challengeId))
                .execute();
    }
}
