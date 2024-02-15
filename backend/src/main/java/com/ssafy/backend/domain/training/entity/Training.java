package com.ssafy.backend.domain.training.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"trainingId"})
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainingId; // 운동 ID, BIGINT, PRIMARY KEY

    @Column(nullable = false, length = 30)
    private String name; // 운동명, VARCHAR(30), NOT NULL

    @Column(nullable = false, length = 30)
    private String category; // 운동부위, VARCHAR(30), NOT NULL

    private String image; // 운동이미지,

}
