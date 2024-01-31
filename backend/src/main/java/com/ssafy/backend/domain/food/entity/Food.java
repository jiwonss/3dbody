package com.ssafy.backend.domain.food.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;
    @Column(nullable = false)
    private String name;             //식품명
    @Column(nullable = false)
    private String category;        //분류(아침, 점심, 저녁, 기타)
    @ColumnDefault("0")
    private int servingSize;        //1회제공량
    @ColumnDefault("0")
    private float calorie;          //칼로리
    @ColumnDefault("0")
    private float carbohydrate;     //탄수화물
    @ColumnDefault("0")
    private float protein;          //단백질
    @ColumnDefault("0")
    private float lipid;            //지방
    private String unit;            //단위

}
