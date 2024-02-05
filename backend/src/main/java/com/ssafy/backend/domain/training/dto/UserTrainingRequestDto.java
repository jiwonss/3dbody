package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class UserTrainingRequestDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("training_id")
    private Long trainingId;

    private LocalDate date;

    private int sequence;

    private int sets;

    private float kg;

    private int count;

}
