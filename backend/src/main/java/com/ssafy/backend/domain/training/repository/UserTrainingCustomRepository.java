package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.dto.SetRequestDto;
import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.entity.UserTraining;

import java.time.LocalDate;
import java.util.List;

public interface UserTrainingCustomRepository {

    List<UserTraining> findAllWithUserIdAndDate(Long userId, int year, int month, int day);

    void deleteWithUserIdAndTrainingIdAndDate(UserTrainingRequestDto requestDto);

    void updateWithUserTrainingIdAndKgAndCount(SetRequestDto requestDto);

    void updateWithUserIdAndTrainingIdAndDateAndSets(Long userId, Long trainingId, LocalDate date, int sets);
}
