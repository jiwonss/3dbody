package com.ssafy.backend.domain.training.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.training.entity.QUserTraining;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserTrainingCustomRepositoryImpl implements UserTrainingCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QUserTraining qUserTraining = QUserTraining.userTraining;

}
