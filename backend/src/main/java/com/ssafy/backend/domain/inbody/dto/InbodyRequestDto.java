package com.ssafy.backend.domain.inbody.dto;

import com.ssafy.backend.domain.inbody.entity.Inbody;
import com.ssafy.backend.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class InbodyRequestDto {

    private float height;
    private  float weight;
    private int bmr;
    private float muscle;
    private float fatMass;
    private float fatPer;
    private float tbw;
    private float whr;
    private float bmi;
    private int score;
    private LocalDateTime date;

    public Inbody toEntity(User user) {
        return Inbody.builder()
                .user(user)
                .height(height)
                .weight(weight)
                .bmr(bmr)
                .muscle(muscle)
                .fatMass(fatMass)
                .fatPer(fatPer)
                .tbw(tbw)
                .whr(whr)
                .bmi(bmi)
                .score(score)
                .date(date)
                .build();
    }

}
