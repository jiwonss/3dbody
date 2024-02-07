package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

/**
 * 운동 삭제 API에서 사용할 DTO
 * userId - 회원ID
 * trainingId - 운동ID
 * date - 날짜
 */
@Getter
@Setter
@ToString
public class UserTrainingDeleteRequestDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("training_id")
    private Long trainingId;

    private LocalDate date;
}
