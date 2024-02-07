package com.ssafy.backend.domain.routine.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineTrainingRequestDto {

    private Long routineId;
    private Long trainingId;
    private int sequence;
    private float kg;
    private int count;
    private int sets;
}
