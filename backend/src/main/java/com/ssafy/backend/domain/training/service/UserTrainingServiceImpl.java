package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.UserTrainingRequestDto;
import com.ssafy.backend.domain.training.dto.SetResponseDto;
import com.ssafy.backend.domain.training.dto.UserTrainingResponseDto;
import com.ssafy.backend.domain.training.entity.Training;
import com.ssafy.backend.domain.training.entity.UserTraining;
import com.ssafy.backend.domain.training.repository.TrainingRepository;
import com.ssafy.backend.domain.training.repository.UserTrainingRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserTrainingServiceImpl implements UserTrainingService {

    private final UserTrainingRepository userTrainingRepository;
    private final UserRepository userRepository;
    private final TrainingRepository trainingRepository;

    // 운동 저장
    @Override
    @Transactional
    public void saveTrainings(Long userId, int year, int month, int day, List<Long> trainings) {

        log.info("요청 잘 들어오나?");
        List<UserTraining> userTrainingList = new ArrayList<>();
        User user = userRepository.getReferenceById(userId);
        LocalDate date = LocalDate.of(year, month, day);

        List<UserTraining> list = userTrainingRepository.findAllWithUserIdAndDate(userId, year, month, day);
        int startIndex = !list.isEmpty() ? 1 + list.get(list.size() - 1).getSequence() : 0;

        for (int i = 0; i < trainings.size(); i++) {
            Training training = trainingRepository.getReferenceById(trainings.get(i));

            UserTraining userTraining = UserTraining
                    .builder()
                    .user(user)
                    .training(training)
                    .date(date)
                    .sequence(startIndex + i)
                    .build();

            userTrainingList.add(userTraining);
        }

        userTrainingRepository.saveAllAndFlush(userTrainingList);
    }

    // 운동 관리
    @Override
    @Transactional
    public List<UserTrainingResponseDto> getTrainings(Long userId, int year, int month, int day) {

        List<UserTraining> userTrainings = userTrainingRepository.findAllWithUserIdAndDate(userId, year, month, day);

        log.info("운동 관리 데이터 받아왔나? {}", userTrainings);

        List<UserTrainingResponseDto> userTrainingResponseDtos = new ArrayList<>();
        TreeMap<Integer, UserTrainingResponseDto> userTrainingResponseDtoTreeMap = new TreeMap<>();

        userTrainings.forEach(u -> {

            int index = u.getSequence();

            if (userTrainingResponseDtoTreeMap.get(index) == null) {
                UserTrainingResponseDto userTrainingResponseDto = UserTrainingResponseDto.toDto(u);
                userTrainingResponseDtoTreeMap.put(index, userTrainingResponseDto);
            }

            SetResponseDto setResponseDto = SetResponseDto.toDto(u);

            userTrainingResponseDtoTreeMap.get(index).getSets().add(setResponseDto);

        });

        log.info("TreeMap {}", userTrainingResponseDtoTreeMap);

        Set<Integer> keySet = userTrainingResponseDtoTreeMap.keySet();

        for (Integer key : keySet) {
            userTrainingResponseDtos.add(userTrainingResponseDtoTreeMap.get(key));
        }

        return userTrainingResponseDtos;
    }

    @Override
    @Transactional
    public void toggle(Long userTrainingId) {
        UserTraining userTraining = userTrainingRepository.findById(userTrainingId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 userTrainingId 입니다."));

        userTraining.updateIsFinished();
    }

    // 세트 추가
    @Override
    public void addSet(UserTrainingRequestDto requestDto) {

        log.info("잘 들어왔나? -{}", requestDto);

        User user = userRepository.getReferenceById(requestDto.getUserId());
        Training training = trainingRepository.getReferenceById(requestDto.getTrainingId());

        UserTraining userTraining = UserTraining
                .builder()
                .user(user)
                .training(training)
                .date(requestDto.getDate())
                .sequence(requestDto.getSequence())
                .sets(requestDto.getSets())
                .kg(requestDto.getKg())
                .count(requestDto.getCount())
                .build();

        userTrainingRepository.saveAndFlush(userTraining);
    }

}
