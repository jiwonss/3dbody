package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.entity.Training;

import java.util.List;

public interface TrainingCustomRepository {
    List<Training> findAllWithCategoryAndKeyword(String category, String keyword);
}
