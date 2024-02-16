package com.ssafy.backend.domain.routine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineSetRequestDto {

    private Long RoutineTrainingListId;
    private float kg;
    private int count;
}
