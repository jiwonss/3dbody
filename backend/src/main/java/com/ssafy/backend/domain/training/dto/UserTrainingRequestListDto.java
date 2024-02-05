package com.ssafy.backend.domain.training.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserTrainingRequestListDto {

    @Builder.Default
    private List<UserTrainingRequestDto> dtoList = new ArrayList<>();

}
