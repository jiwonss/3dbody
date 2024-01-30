package com.ssafy.backend.domain.inbody.dto;

import com.ssafy.backend.domain.inbody.entity.InbodyImage;

import java.time.LocalDateTime;
import java.util.List;

public class InbodyResponseDto {

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
