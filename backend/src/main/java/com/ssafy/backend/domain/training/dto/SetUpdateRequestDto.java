package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * kg, count 데이터 수정 API에서 사용할 DTO
 * userTrainingId - 회원운동ID
 * kg - 무게
 * count - 횟수
 */
@Getter
@Setter
@ToString
public class SetUpdateRequestDto {

    @JsonProperty("user_training_id")
    private Long userTrainingId;

    private float kg;

    private int count;

}
