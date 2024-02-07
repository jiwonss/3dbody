package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.dto.SetUpdateRequestDto;
import com.ssafy.backend.domain.training.entity.UserTraining;

import java.time.LocalDate;
import java.util.List;

public interface UserTrainingCustomRepository {

    List<UserTraining> findAllWithUserIdAndDate(Long userId, int year, int month, int day);

    void updateWithUserTrainingIdAndKgAndCount(SetUpdateRequestDto requestDto);

    void updateWithUserIdAndTrainingIdAndDateAndSets(Long userId, Long trainingId, LocalDate date, int sets);

    UserTraining findWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date);
}
