package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.training.entity.Training;
import lombok.Builder;
import lombok.Data;

/**
 * 운동 리스트 API에서 사용할 DTO
 * trainingId - 운동ID
 * name - 운동명
 * category - 운동부위
 * image - 운동이미지
 */
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
