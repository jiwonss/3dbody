package com.ssafy.backend.domain.routine.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class GetTrainingResponseDto {
    private Long routineId;

    @Builder.Default
    @JsonProperty("routine_training_list")
    private List<RoutineTrainingResponseDto> routineTrainingList = new ArrayList<>();
}
