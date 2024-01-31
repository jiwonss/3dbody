package com.ssafy.backend.domain.inbody.dto;

import com.ssafy.backend.domain.inbody.entity.Inbody;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InbodyResponseDto {

    private Long inbodyId;
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
    private List<InbodyImageDto> images;

    public static InbodyResponseDto of(Inbody inbody) {
        return InbodyResponseDto.builder()
                .inbodyId(inbody.getInbodyId())
                .height(inbody.getHeight())
                .weight(inbody.getWeight())
                .bmr(inbody.getBmr())
                .muscle(inbody.getMuscle())
                .fatMass(inbody.getFatMass())
                .fatPer(inbody.getFatPer())
                .tbw(inbody.getTbw())
                .whr(inbody.getWhr())
                .bmi(inbody.getBmi())
                .score(inbody.getScore())
                .date(inbody.getDate())
                .images(inbody.getInbodyImages().stream()
                        .map(InbodyImageDto::of).collect(Collectors.toList()))
                .build();
    }

}
