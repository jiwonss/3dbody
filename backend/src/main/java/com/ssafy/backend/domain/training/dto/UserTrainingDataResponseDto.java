package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Data
@Builder
public class UserTrainingDataResponseDto {

    private LocalDate date;

    @Builder.Default
    @JsonProperty("user_training_list")
    private List<UserTrainingResponseDto> userTrainingList = new ArrayList<>();

}
