package com.ssafy.backend.domain.food.service;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.dto.FoodListRequestDto;
import com.ssafy.backend.domain.food.dto.UserFoodListDto;
import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.entity.UserFood;
import com.ssafy.backend.domain.food.repository.FoodRepository;
import com.ssafy.backend.domain.food.repository.UserFoodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodServiceImpl implements FoodService{

    final FoodRepository foodRepository;
    final UserFoodRepository userFoodRepository;

    //식단 관리 페이지
    @Override
    public List<UserFoodListDto> findByUserIdAndDate(Long userId, int year, int month, int day){
        log.info("service들어와?");
        List<UserFood> userFoodEntities = userFoodRepository.findByUserIdAndDate(userId, year, month, day);
        log.info("service return 잘 받아? {}", userFoodEntities);
        List<UserFoodListDto> userFoodList = userFoodEntities.stream()
                .map(UserFoodListDto::toDto)
                .toList();
        return userFoodList;
    }
    //식단 관리 카테고리별 상세
    public List<UserFoodListDto> findByListCategory(Long userId, int year, int month, int day, String category){
        List<UserFood> userFoodCategoryEntites = userFoodRepository.findByListCategory(userId, year, month, day, category);
       List<UserFoodListDto> userFoodListCategory = userFoodCategoryEntites.stream()
               .map(UserFoodListDto::toDto)
               .toList();
        return userFoodListCategory;
    }

    //음식 등록
    @Override
    public void addFoodList(FoodListRequestDto foodListRequestDto){
        Food food = foodListRequestDto.toEntity();
        foodRepository.save(food);
    }

    //음식 검색
    @Override
    public List<FoodListDto> findByNameContaining(String keyword) {
        log.info("들어오나");
        List<Food> foodEntities = foodRepository.findByNameContaining(keyword);
        List<FoodListDto> foodList = foodEntities.stream()
                .map(FoodListDto::toDto)
                .collect(Collectors.toList());
        return foodList;
    }

    //음식 삭제
    public void deleteById(Long userFoodId){
        userFoodRepository.deleteById(userFoodId);
    }



}
