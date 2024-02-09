package com.ssafy.backend.domain.training.repository;

import com.ssafy.backend.domain.training.entity.UserTraining;

import java.time.LocalDate;
import java.util.List;

public interface UserTrainingCustomRepository {

    // 회원ID, 날짜 기반 운동 정보 조회(운동 조회, 운동 추가)
    List<UserTraining> findAllWithUserIdAndDate(Long userId, LocalDate date);

    // kg, count 데이터 수정
    void updateWithUserTrainingIdAndKgAndCount(Long userTrainingId, float kg, int count);

    // 해당 날짜, 회원, 운동 중에서 가장 마지막 세트를 찾아서 반환시켜주는 메서드
    UserTraining findLastOneWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date);

    // 운동 삭제 메서드
    void deleteWithUserIdAndTrainingIdAndDate(Long userId, Long trainingId, LocalDate date);

    // 운동 삭제후 남은 운동 sequence 1씩 감소시켜주는 메서드
    void updateWithUserIdAndDateAndSequence(Long userId, LocalDate date, int sequence);

    // 회원ID 기반 운동 정보 조회(운동 조회)
    List<UserTraining> findAllWithUserId(Long userId);
}
