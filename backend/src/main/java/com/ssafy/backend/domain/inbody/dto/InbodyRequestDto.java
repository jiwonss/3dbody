package com.ssafy.backend.domain.inbody.dto;

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

}
