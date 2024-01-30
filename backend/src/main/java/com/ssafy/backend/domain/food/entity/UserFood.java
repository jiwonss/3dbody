package com.ssafy.backend.domain.food.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class UserFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userFoodId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String category;
    private LocalDateTime date;
}
