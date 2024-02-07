package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.dto.SetUpdateRequestDto;
import com.ssafy.backend.domain.training.entity.UserTraining;

import java.time.LocalDate;
import java.util.List;

public interface UserTrainingCustomRepository {

    List<UserTraining> findAllWithUserIdAndDate(Long userId, LocalDate date);

    void updateWithUserTrainingIdAndKgAndCount(SetUpdateRequestDto requestDto);

    // 해당 날짜, 회원, 운동 중에서 가장 마지막 세트를 찾아서 반환시켜주는 메서드
    UserTraining findLastOneWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date);

    void deleteWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date);

    void updateWithUserIdAndDateAndSequence(Long userId, LocalDate date, int sequence);
}
