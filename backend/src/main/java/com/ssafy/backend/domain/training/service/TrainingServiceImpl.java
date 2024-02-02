package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.entity.Training;
import com.ssafy.backend.domain.training.repository.RestRepository;
import com.ssafy.backend.domain.training.repository.TrainingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;
    private final RestRepository restRepository;

    // 운동 리스트(검색, 카테고리)
    @Override
    public List<TrainingResponseDto> searchTraining(String category, String keyword) {

        List<Training> trainings = trainingRepository.findAllWithCategoryAndKeyword(category, keyword);
        List<TrainingResponseDto> dtoList = new ArrayList<>();

        trainings.forEach(t -> {
            TrainingResponseDto dto = TrainingResponseDto.toDto(t);
            dtoList.add(dto);
        });
        return dtoList;
    }
}
