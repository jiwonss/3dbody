package com.ssafy.backend.domain.training.repository;

public interface RestCustomRepository {

    // 운동 휴식여부
    boolean existsRestWithUserIdAndYearAndMonthAndDay(Long userId, int year, int month, int day);

    // 운동 휴식해제
    void deleteRestWithUserIdAndYearAndMonthAndDay(Long userId, int year, int month, int day);

}
