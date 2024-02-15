package com.ssafy.backend.domain.training.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.entity.QTraining;
import com.ssafy.backend.domain.training.entity.Training;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;

@RequiredArgsConstructor
public class TrainingCustomRepositoryImpl implements TrainingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QTraining qTraining = QTraining.training;

    @Override
    public List<Training> findAllWithCategoryAndKeyword(String category, String keyword) {

        return jpaQueryFactory.selectFrom(qTraining)
                .where(eqCategory(category), likeKeyword(keyword))
                .fetch();
    }

    // 운동 이미지 수정
    @Override
    public void updateWithTrainingIdAndImage(Long trainingId, String image) {
        jpaQueryFactory.update(qTraining)
                .set(qTraining.image, image)
                .where(qTraining.trainingId.eq(trainingId))
                .execute();
    }

    private BooleanExpression likeKeyword(String keyword) {
        return StringUtils.hasText(keyword) ? qTraining.name.contains(keyword) : null;
    }

    private BooleanExpression eqCategory(String category) {
        if (category == null || category.isEmpty()) {
            return null;
        }
        return qTraining.category.eq(category);
    }
}
