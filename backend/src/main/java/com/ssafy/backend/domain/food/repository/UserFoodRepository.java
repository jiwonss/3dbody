package com.ssafy.backend.domain.food.repository;

import com.ssafy.backend.domain.food.entity.UserFood;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserFoodRepository extends JpaRepository<UserFood, Long> {

    @Query("SELECT uf " +
            "FROM UserFood uf JOIN FETCH uf.food f " +
            "WHERE uf.user.userId = :userId AND YEAR(uf.date) = :year AND MONTH(uf.date) = :month AND DAY(uf.date) = :day ")
    List<UserFood> findByUserIdAndDate(@Param("userId") Long userId,
                                       @Param("year") int year,
                                       @Param("month") int month,
                                       @Param("day") int day);

    //식사관리카테고리별
    @Query("SELECT uf " +
            "FROM UserFood uf " +
            "JOIN FETCH uf.food f " +
            "JOIN FETCH uf.user u " +
            "WHERE uf.user.userId = :userId " +
            "AND YEAR(uf.date) = :year " +
            "AND MONTH(uf.date) = :month " +
            "AND DAY(uf.date) = :day " +
            "AND uf.category = :category ")
    List<UserFood> findByListCategory(@Param("userId") Long userId,
                                      @Param("year") int year,
                                      @Param("month") int month,
                                      @Param("day") int day,
                                      @Param("category") String category);

}
