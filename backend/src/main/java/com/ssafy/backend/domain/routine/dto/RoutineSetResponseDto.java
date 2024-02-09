package com.ssafy.backend.domain.routine.dto;


import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoutineSetResponseDto {

    private Long RoutineTrainingListId;
    private float kg;
    private int count;

    public static RoutineSetResponseDto toDto(RoutineTrainingList routineTrainingList){

        return RoutineSetResponseDto
                .builder()
                .RoutineTrainingListId(routineTrainingList.getRoutineTrainingListId())
                .kg(routineTrainingList.getKg())
                .count(routineTrainingList.getCount())
                .build();
    }
}
