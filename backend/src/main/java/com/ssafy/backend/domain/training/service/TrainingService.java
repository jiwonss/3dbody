package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;

import java.util.List;

public interface TrainingService {

    // 운동 리스트(검색, 카테고리)
    List<TrainingResponseDto> searchTraining(String category, String keyword);
}
