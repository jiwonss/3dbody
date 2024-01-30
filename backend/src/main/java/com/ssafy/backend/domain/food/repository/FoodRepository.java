package com.ssafy.backend.domain.food.repository;

import com.ssafy.backend.domain.food.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
