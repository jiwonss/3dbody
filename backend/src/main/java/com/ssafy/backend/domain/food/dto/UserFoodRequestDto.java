package com.ssafy.backend.domain.food.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.food.entity.Food;
import com.ssafy.backend.domain.food.entity.UserFood;
import com.ssafy.backend.domain.user.entity.User;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
public class UserFoodRequestDto {

    private Long userFoodId;
    @JsonProperty("user_id")
    private Long userId;
    @JsonProperty("food_id")
    private Long foodId;
    private Food food;
    private User user;
    private int foodCount;
    private int servingSize;        //1회제공량
    private String category;
    private LocalDateTime date;

    /* Dto -> Entity */
    public UserFood toEntity(){
        return UserFood.builder()
                .userFoodId(userFoodId)
                .user(user)
                .food(food)
                .foodCount(foodCount)
                .servingSize(servingSize)
                .category(category)
                .date(date)
                .build();
    }
}
