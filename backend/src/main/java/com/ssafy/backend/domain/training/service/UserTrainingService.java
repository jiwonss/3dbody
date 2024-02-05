package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.dto.UserTrainingResponseDto;

import java.util.List;

public interface UserTrainingService {

    // 운동 저장
    void saveTrainings(Long userId, int year, int month, int day, List<Long> trainings);


    // 운동 관리
    List<UserTrainingResponseDto> getTrainings(Long userId, int year, int month, int day);

    // 운동 완료 여부 수정
    void toggle(Long userTrainingId);

    // 세트 추가
    void addSet(UserTrainingRequestDto requestDto);
}
