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
}
