package com.ssafy.backend.domain.food.controller;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.service.FoodService;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/management/food")
@Slf4j
public class FoodController {

    private final FoodService foodService;

//    @GetMapping("list/{user_id}/?year={year}&month={month}&day={day}")

    //음식 검색
    @GetMapping("/search")
    public ResponseEntity<?> searchFoodList(@RequestParam("keyword") String keyword) {
        log.info("controller 들어와?");
        List<FoodListDto> foodList;
        foodList = foodService.findByNameContaining(keyword);
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }
}
