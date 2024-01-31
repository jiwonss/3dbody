package com.ssafy.backend.domain.food.dto;

import com.ssafy.backend.domain.food.entity.Food;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodListDto {

    private Long foodId;
    private String name;
    private float calorie;

    public static FoodListDto toDto(Food food){
        return FoodListDto.builder()
                .foodId(food.getFoodId())
                .name(food.getName())
                .calorie(food.getCalorie())
                .build();
    }
}
