package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.training.entity.UserTraining;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SetDto {

    @JsonProperty("user_training_id")
    private Long userTrainingId;

    private float kg;

    private int count;

    public static SetDto toDto(UserTraining userTraining) {

        return SetDto
                .builder()
                .userTrainingId(userTraining.getUserTrainingId())
                .kg(userTraining.getKg())
                .count(userTraining.getCount())
                .build();

    }

}
