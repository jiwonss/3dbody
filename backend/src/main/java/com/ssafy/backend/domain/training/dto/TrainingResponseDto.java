package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.training.entity.Training;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrainingResponseDto {

    @JsonProperty("training_id")
    private Long trainingId;

    private String name;

    private String category;

    private String image;

    public static TrainingResponseDto toDto(Training training) {

        return TrainingResponseDto
                .builder()
                .trainingId(training.getTrainingId())
                .name(training.getName())
                .category(training.getCategory())
                .image(training.getImage())
                .build();

    }

}
