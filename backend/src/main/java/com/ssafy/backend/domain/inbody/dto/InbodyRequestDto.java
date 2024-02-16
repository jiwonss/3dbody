package com.ssafy.backend.domain.inbody.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.inbody.entity.Inbody;
import com.ssafy.backend.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class InbodyRequestDto {

    private float height;
    private  float weight;
    private int bmr;
    private float muscle;

    @JsonProperty("fat_mass")
    private float fatMass;

    @JsonProperty("fat_per")
    private float fatPer;

    private float tbw;
    private float whr;
    private float bmi;
    private int score;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime date;

    private List<InbodyImageDto> images = new ArrayList<>();

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
                .inbodyImages(new ArrayList<>())
                .build();
    }

}
