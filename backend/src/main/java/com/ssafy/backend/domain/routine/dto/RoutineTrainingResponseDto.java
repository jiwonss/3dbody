package com.ssafy.backend.domain.routine.dto;

import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class RoutineTrainingResponseDto {
    private Long routineTrainingListId;
    private Long routineId;
    private Long trainingId;
    private int sequence;
    private float kg;
    private int count;
    private int sets;

    public static RoutineTrainingResponseDto toDto(RoutineTrainingList routineTrainingList){
        return RoutineTrainingResponseDto.builder()
                .routineTrainingListId(routineTrainingList.getRoutineTrainingListId())
                .routineId(routineTrainingList.getRoutine().getRoutineId())
                .trainingId(routineTrainingList.getTraining().getTrainingId())
                .sequence(routineTrainingList.getSequence())
                .kg(routineTrainingList.getKg())
                .count(routineTrainingList.getCount())
                .sets(routineTrainingList.getSets())
                .build();
    }
}
