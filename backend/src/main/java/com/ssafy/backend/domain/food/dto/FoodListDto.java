package com.ssafy.backend.domain.food.dto;

import com.ssafy.backend.domain.food.entity.Food;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodListDto {

    private Long foodId;
    private String name;            //식품명
    private String category;         //분류(아침, 점심, 저녁, 기타)
    private int servingSize;        //1회제공량
    private float calorie;          //칼로리
    private float carbohydrate;     //탄수화물
    private float protein;          //단백질
    private float lipid;            //지방
    private String unit;            //단위

    public static FoodListDto toDto(Food food){
        return FoodListDto.builder()
                .foodId(food.getFoodId())
                .name(food.getName())
                .category(food.getCategory())
                .servingSize(food.getServingSize())
                .calorie(food.getCalorie())
                .carbohydrate(food.getCarbohydrate())
                .protein(food.getProtein())
                .lipid(food.getLipid())
                .build();
    }
}
