package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SetUpdateRequestDto {

    @JsonProperty("user_training_id")
    private Long userTrainingId;

    private float kg;

    private int count;

}
