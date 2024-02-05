package com.ssafy.backend.domain.food.dto;

import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.entity.UserFood;
import com.ssafy.backend.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@ToString
public class UserFoodListDto {

    private Long userFoodId;
    private Long userId;
    private Food food;
    private int foodCount;
    private int servingSize;        //1회제공량
    private String category;
    private LocalDateTime date;


    public static UserFoodListDto toDto(UserFood userFood){
        return UserFoodListDto.builder()
                .userFoodId(userFood.getUserFoodId())
                .userId(userFood.getUser().getUserId())
                .food(userFood.getFood())
                .foodCount(userFood.getFoodCount())
                .servingSize(userFood.getServingSize())
                .category(userFood.getCategory())
                .date(userFood.getDate())
                .build();

    }

}
