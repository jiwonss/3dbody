package com.ssafy.backend.domain.food.service;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.repository.FoodRepository;
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

    //식단 관리 페이지

    //전체 목록

    //등록

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

}
