package com.ssafy.backend.domain.routine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SetCreateRoutineRequestDto {

    private Long routineId;
    private Long trainingId;
}
