package com.ssafy.backend.domain.food.service;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.dto.FoodListRequestDto;
import com.ssafy.backend.domain.food.dto.UserFoodListDto;

import java.util.List;

public interface FoodService {
    public List<FoodListDto> findByNameContaining(String keyword);
    public void addFoodList(FoodListRequestDto foodListRequestDto);         //음식등록
    public List<UserFoodListDto> findByUserIdAndDate(Long userId, int year, int month, int day);        //식사기록메인
    public List<UserFoodListDto> findByListCategory(Long userId, int year, int month, int day, String category);
    public void deleteById(Long userFoodId);
}
