package com.ssafy.backend.domain.food.service;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.entity.Food;

import java.util.List;

public interface FoodService {
    public List<FoodListDto> findByNameContaining(String keyword);
}
