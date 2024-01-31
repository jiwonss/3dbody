package com.ssafy.backend.domain.food.repository;

import com.ssafy.backend.domain.food.entity.ChoiceFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceFoodRepository extends JpaRepository<ChoiceFood, Long> {
}
