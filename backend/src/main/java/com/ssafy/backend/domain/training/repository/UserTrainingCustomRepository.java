package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.entity.UserTraining;

import java.util.List;

public interface UserTrainingCustomRepository {

    List<UserTraining> findAllWithUserIdAndDate(Long userId, int year, int month, int day);

    void deleteWithUserIdAndTrainingIdAndDate(UserTrainingRequestDto requestDto);
}
