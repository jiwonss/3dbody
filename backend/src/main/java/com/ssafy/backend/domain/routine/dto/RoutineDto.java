package com.ssafy.backend.domain.routine.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.routine.entity.Routine;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
public class RoutineDto {

    private Long routineId;
    @JsonProperty("user_id")
    private Long userId;
    private String title;

    public static RoutineDto toDto(Routine routine){
        return RoutineDto.builder()
                .routineId(routine.getRoutineId())
                .userId(routine.getUser().getUserId())
                .title(routine.getTitle())
                .build();
    }
}
