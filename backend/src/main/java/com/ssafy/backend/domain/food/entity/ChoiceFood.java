package com.ssafy.backend.domain.food.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor
public class ChoiceFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceFoodId;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "user_food_id")
    private UserFood userFood;

    @ColumnDefault("0")
    private int foodCount;

}
