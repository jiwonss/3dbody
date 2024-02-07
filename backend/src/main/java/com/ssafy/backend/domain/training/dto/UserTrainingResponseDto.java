package com.ssafy.backend.domain.training.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.training.entity.UserTraining;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * 운동 조회 API에서 사용할 DTO
 * userId - 회원ID
 * trainingId - 운동ID
 * date - 날짜
 * sets - 운동 세트(무게, 횟수, 완료여부)
 */
@Data
@Builder
public class UserTrainingResponseDto {

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("training_id")
    private Long trainingId;

    private LocalDate date;

    @Builder.Default
    private List<SetResponseDto> sets = new ArrayList<>();

    public static UserTrainingResponseDto toDto(UserTraining userTraining) {

        return UserTrainingResponseDto
                .builder()
                .userId(userTraining.getUser().getUserId())
                .trainingId(userTraining.getTraining().getTrainingId())
                .date(userTraining.getDate())
                .build();

    }

}
