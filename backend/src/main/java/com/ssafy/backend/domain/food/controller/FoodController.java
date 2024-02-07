package com.ssafy.backend.domain.food.controller;

import com.ssafy.backend.domain.food.dto.FoodListDto;
import com.ssafy.backend.domain.food.dto.FoodListRequestDto;
import com.ssafy.backend.domain.food.dto.UserFoodListDto;
import com.ssafy.backend.domain.food.dto.UserFoodRequestDto;
import com.ssafy.backend.domain.food.service.FoodService;
import com.ssafy.backend.global.dto.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<FoodListDto> foodList;
        foodList = foodService.findByNameContaining(keyword);
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }
    //음식 추가 직접 입력
    @PostMapping("/add")
    public ResponseEntity<?> addFoodList(@RequestBody FoodListRequestDto foodListRequestDto){
        foodService.addFoodList(foodListRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    //음식 추가 리스트
    //카테고리랑, userId, foodId
//    @GetMapping("/add/{user_id}")
//    public ResponseEntity<?> saveUserFoodList(@PathVariable("user_id") Long userId, @RequestParam("food_id") Long foodId, @RequestParam("category") String category){
//        foodService.saveUserFoodList(userId, foodId, category);
//        return ResponseEntity.ok(Response.success());
//    }

    //user 식단 추가
    @PostMapping("/list/add")
    public ResponseEntity<?> saveUserFoZodList(@RequestBody UserFoodRequestDto userFoodRequestDto){
        log.info("controller에서확인 {}",userFoodRequestDto);
        foodService.saveUserFoodList(userFoodRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    //식단 관리 페이지
    @GetMapping("/list/{user_id}")
    public ResponseEntity<?> findByUserIdAndDate(@PathVariable("user_id") Long userId, @RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day){
        log.info("들어와?");
        List<UserFoodListDto> userFoodList = foodService.findByUserIdAndDate(userId, year, month, day);

        return new ResponseEntity<>(userFoodList, HttpStatus.OK);
    }

//    //카테고리(아침, 점심, 저녁, 기타)별 상세 조회
    @GetMapping("/list/category/{user_id}")
    public ResponseEntity<?> findByListCategory(@PathVariable("user_id") Long userId, @RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day, @RequestParam("category") String category){
        List<UserFoodListDto> userFoodListCategory = foodService.findByListCategory(userId, year, month, day, category);
        return new ResponseEntity<>(userFoodListCategory, HttpStatus.OK);
    }

    //음식 갯수(foodCount) or 제공량(servingSize) 업데이트
    @PutMapping("/update/{user_food_id}")
    public ResponseEntity<?> updateUserFood(@PathVariable("user_food_id") Long userFoodId, @RequestBody UserFoodRequestDto userFoodRequestDto) {
        // userFoodId를 사용하여 업데이트할 UserFood를 찾아오는 로직이 필요
        log.info("확인");
        // 찾아온 UserFood 업데이트
        foodService.updateUserFood(userFoodRequestDto, userFoodId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //음식 삭제
    @DeleteMapping("/delete/{user_food_id}")
    public ResponseEntity<?> deleteById(@PathVariable("user_food_id") Long userFoodId){
        log.info("와?");
        foodService.deleteById(userFoodId);
        return ResponseEntity.ok(Response.success());
    }
}
