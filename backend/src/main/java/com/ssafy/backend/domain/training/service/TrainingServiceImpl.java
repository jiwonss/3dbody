package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.entity.Rest;
import com.ssafy.backend.domain.training.entity.Training;
import com.ssafy.backend.domain.training.repository.RestRepository;
import com.ssafy.backend.domain.training.repository.TrainingRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;
    private final RestRepository restRepository;
    private final UserRepository userRepository;

    // 운동 휴식여부
    @Override
    public boolean checkRest(Long userId, int year, int month, int day) {

        return restRepository.existsRestWithUserIdAndYearAndMonthAndDay(userId, year, month, day);
    }

    // 운동 휴식등록
    @Override
    public void takeRest(Long userId, int year, int month, int day) {

        User user = userRepository.getReferenceById(userId);
        LocalDate date = LocalDate.of(year, month, day);

        Rest rest = Rest.builder()
                .user(user)
                .date(date)
                .build();

        restRepository.saveAndFlush(rest);
    }

    // 운동 휴식해제
    @Override
    public void removeRest(Long userId, int year, int month, int day) {

        restRepository.deleteRestWithUserIdAndYearAndMonthAndDay(userId, year, month, day);
    }

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
