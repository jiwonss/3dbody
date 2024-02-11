package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.training.entity.UserTraining;
import lombok.*;

/**
 * 운동 조회 API에서 세트 목록에 사용할 DTO
 * userTrainingId - 회원운동ID -> kg, count 수정시 사용하기 위해서 필요
 * kg - 무게
 * count - 횟수
 * isFinished - 세트 완료 여부
 */
@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
public class SetDto {

    @JsonProperty("user_training_id")
    private Long userTrainingId;

    private float kg;

    private int count;

    @JsonProperty("is_finished")
    private boolean isFinished;

    public static SetDto toDto(UserTraining userTraining) {

        return SetDto
                .builder()
                .userTrainingId(userTraining.getUserTrainingId())
                .kg(userTraining.getKg())
                .count(userTraining.getCount())
                .isFinished(userTraining.isFinished())
                .build();

    }

}
