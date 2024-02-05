package com.ssafy.backend.domain.training.service;

import java.util.List;

public interface UserTrainingService {

    // 운동 저장
    void saveTrainings(Long userId, int year, int month, int day, List<Long> trainings);
    // 운동 저장
}
