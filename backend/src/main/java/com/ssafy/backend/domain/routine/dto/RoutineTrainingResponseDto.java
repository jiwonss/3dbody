package com.ssafy.backend.domain.routine.dto;

import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class RoutineTrainingResponseDto {
    /**
     * 루틴 조회 API
     * 루틴 ID
     * 운동 ID
     * 운동명
     * 운동 부위
     * 운동 이미지
     * SET 운동 세트
     */
    private Long routineTrainingListId;

    private Long routineId;

    private Long trainingId;

    private String name;

    private String category;

    private String image;

    @Builder.Default
    private List<RoutineSetResponseDto> sets = new ArrayList<>();

    public static RoutineTrainingResponseDto toDto(RoutineTrainingList routineTrainingList){
        return RoutineTrainingResponseDto.builder()
                .routineTrainingListId(routineTrainingList.getRoutineTrainingListId())
                .routineId(routineTrainingList.getRoutine().getRoutineId())
                .trainingId(routineTrainingList.getTraining().getTrainingId())
                .name(routineTrainingList.getTraining().getName())
                .category(routineTrainingList.getTraining().getCategory())
                .image(routineTrainingList.getTraining().getImage())
                .build();
    }
}
