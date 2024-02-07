package com.ssafy.backend.domain.inbody.entity;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Inbody extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inbodyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private float height; // 키

    private  float weight; // 몸무게

    private int bmr; // 기초대사량

    private float muscle; // 골격근

    private float fatMass; // 체지방량

    private float fatPer; // 체지방률

    private float tbw; // 체수분량

    private float whr; // 복부지방율

    private float bmi; // BMI

    private int score; // 인바디점수

    private LocalDateTime date; // 검사일자

    @OneToMany(mappedBy = "inbody", orphanRemoval = true)
    private List<InbodyImage> inbodyImages = new ArrayList<>();

    public void updateHeight(float height) {
        if (height > 0.0) {
            this.height = height;
        }
    }

    public void updateWeight(float weight) {
        if (weight > 0.0) {
            this.weight = weight;
        }
    }

    public void updateBmr(int bmr) {
        if (bmr > 0) {
            this.bmr = bmr;
        }
    }

    public void updateMuscle(float muscle) {
        if (muscle > 0.0) {
            this.muscle = muscle;
        }
    }

    public void updateFatMass(float fatMass) {
        if (fatMass > 0.0) {
            this.fatMass = fatMass;
        }
    }

    public void updateFatPer(float fatPer) {
        if (fatPer > 0.0) {
            this.fatPer = fatPer;
        }
    }

    public void updateTbw(float tbw) {
        if (tbw > 0.0) {
            this.tbw = tbw;
        }
    }

    public void updateWhr(float whr) {
        if (whr > 0.0) {
            this.whr = whr;
        };
    }

    public void updateBmi(float bmi) {
        if (bmi > 0.0) {
            this.bmi = bmi;
        }
    }

    public void updateScore(int score) {
        if (score > 0) {
            this.score = score;
        }
    }

    public void updateDate(LocalDateTime date) {
        if (date != null) {
            this.date = date;
        }
    }

    public void addInbodyImage(InbodyImage inbodyImage) {
        this.inbodyImages.add(inbodyImage);
    }

    public void deleteInbodyImage(InbodyImage inbodyImage) { this.inbodyImages.remove(inbodyImage);}

}
