package com.ssafy.backend.domain.food.service;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.dto.FoodListRequestDto;
import com.ssafy.backend.domain.food.dto.UserFoodListDto;
import com.ssafy.backend.domain.food.dto.UserFoodRequestDto;
import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.entity.UserFood;
import com.ssafy.backend.domain.food.repository.FoodRepository;
import com.ssafy.backend.domain.food.repository.UserFoodRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
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
    final UserRepository userRepository;

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
    @Override
    public List<UserFoodListDto> findByListCategory(Long userId, int year, int month, int day, String category){
        List<UserFood> userFoodCategoryEntites = userFoodRepository.findByListCategory(userId, year, month, day, category);
       List<UserFoodListDto> userFoodListCategory = userFoodCategoryEntites.stream()
               .map(UserFoodListDto::toDto)
               .toList();
        return userFoodListCategory;
    }

    //음식 직접 입력 등록
    @Override
    public void addFoodList(FoodListRequestDto foodListRequestDto){
        Food food = foodListRequestDto.toEntity();
        foodRepository.save(food);
    }

    //음식 개수 or 일일제공량 업데이트
    @Override
    public void updateUserFood(UserFoodRequestDto userFoodRequestDto, Long userFoodId){
        int foodCount = userFoodRequestDto.getFoodCount();
        int servingSize = userFoodRequestDto.getServingSize();
        UserFood userFood = userFoodRepository.findById(userFoodId).orElse(null);
        // 찾아온 UserFood 업데이트
        if (userFood != null) {
            // 음식 개수(foodCount) 업데이트
            userFood.setFoodCount(foodCount);
            // 1회 제공량(servingSize) 업데이트
            userFood.setServingSize(servingSize);
            // 엔터티를 저장
            userFoodRepository.save(userFood);
        }
    }

    //user 식단 추가
    @Override
    public void saveUserFoodList(UserFoodRequestDto userFoodRequestDto){
        log.info("dto 확인: {}", userFoodRequestDto);

        User user = userRepository.getReferenceById(userFoodRequestDto.getUserId());
        Food food = foodRepository.getReferenceById(userFoodRequestDto.getFoodId());

        // UserFood 초기화
        UserFood userFood = UserFood.builder()
                .user(user)
                .food(food)
                .foodCount(userFoodRequestDto.getFoodCount())
                .category(userFoodRequestDto.getCategory())
                .date(userFoodRequestDto.getDate())
                .build();

        // UserFood에 servingSize 설정
        userFood.setServingSize(food.getServingSize());

        if(userFood.getFoodCount() == 0){
            userFood.setFoodCount(1);
        }

        log.info("확인: {}", userFood);
        userFoodRepository.save(userFood);
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
