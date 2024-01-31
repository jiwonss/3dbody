package com.ssafy.backend.domain.food.dto;

import com.ssafy.backend.domain.food.entity.Food;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class FoodListRequestDto {

    private String name;            //식품명
    private String category;
    private int servingSize;        //1회제공량
    private float calorie;          //칼로리
    private float carbohydrate;     //탄수화물
    private float protein;          //단백질
    private float lipid;            //지방

    /* Dto -> Entity */
    public Food toEntity() {
        return Food.builder()
                .name(name)
                .category(category)
                .servingSize(servingSize)
                .calorie(calorie)
                .carbohydrate(carbohydrate)
                .protein(protein)
                .lipid(lipid)
                .build();
    }
}
