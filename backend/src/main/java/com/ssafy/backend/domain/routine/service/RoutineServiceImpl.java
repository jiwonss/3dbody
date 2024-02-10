package com.ssafy.backend.domain.routine.service;

import com.ssafy.backend.domain.routine.dto.*;
import com.ssafy.backend.domain.routine.entity.Routine;
import com.ssafy.backend.domain.routine.entity.RoutineTrainingList;
import com.ssafy.backend.domain.routine.repository.RoutineRepository;
import com.ssafy.backend.domain.routine.repository.RoutineTrainingListRepository;
import com.ssafy.backend.domain.training.dto.UserTrainingDto;
import com.ssafy.backend.domain.training.entity.Training;
import com.ssafy.backend.domain.training.entity.UserTraining;
import com.ssafy.backend.domain.training.repository.TrainingRepository;
import com.ssafy.backend.domain.training.repository.UserTrainingRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoutineServiceImpl implements RoutineService{

    final RoutineRepository routineRepository;
    final UserRepository userRepository;
    final RoutineTrainingListRepository routineTrainingListRepository;
    final TrainingRepository trainingRepository;
    final UserTrainingRepository userTrainingRepository;

    //나만의 루틴 목록
    @Override
    public List<RoutineDto> routineList(Long userId){
        List<Routine> routineEntities = routineRepository.findAllByUserUserId(userId);
        List<RoutineDto> routineDtoList = routineEntities.stream()
                .map(RoutineDto::toDto)
                .collect(Collectors.toList());
        return routineDtoList;
    }

    //나만의 루틴 추가
    @Override
    public void saveRoutine(RoutineDto routineDto){
        User user = userRepository.findById(routineDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("userId 없음"));
        Routine routine = new Routine();
        routine.setUser(user);
        routine.setTitle(routineDto.getTitle());
        routineRepository.save(routine);
    }
    //나만의 루틴 이름 편집
    @Override
    public void updateRoutine(Long routineId, String newTitle){
        Routine routine = routineRepository.findById(routineId)
                .orElseThrow(() -> new IllegalArgumentException("루틴아이디없음 " + routineId));
        routine.setTitle(newTitle);
        routineRepository.save(routine);
    }

    //루틴 상세 조회
    @Override
    @Transactional
    public GetTrainingResponseDto getTrainings(Long routineId){
//        List<RoutineTrainingList> routineEntities = routineTrainingListRepository.findAllByroutineTrainingListRoutineId(routineId);
//        List<RoutineTrainingResponseDto> routineTrainingResponseDtoList = routineEntities.stream()
//                .map(RoutineTrainingResponseDto::toDto)
//                .collect(Collectors.toList());
//        return routineTrainingResponseDtoList;

        List<RoutineTrainingList> routineTrainings = routineTrainingListRepository.findAllWithRoutineId(routineId);

        GetTrainingResponseDto responseDto = GetTrainingResponseDto
                .builder()
                .routineId(routineId)
                .build();

        TreeMap<Integer, RoutineTrainingResponseDto> routineTrainingResponseDtoTreeMap = new TreeMap<>();

        routineTrainings.forEach(u -> {

            int index = u.getSequence();

            if(routineTrainingResponseDtoTreeMap.get(index) == null){
                RoutineTrainingResponseDto routineTrainingResponseDto = RoutineTrainingResponseDto.toDto(u);
                routineTrainingResponseDtoTreeMap.put(index,routineTrainingResponseDto);

            }
            RoutineSetResponseDto routineSetResponseDto = RoutineSetResponseDto.toDto(u);

            routineTrainingResponseDtoTreeMap.get(index).getSets().add(routineSetResponseDto);
        });

        Set<Integer> keySet = routineTrainingResponseDtoTreeMap.keySet();

        for (Integer key : keySet){
            responseDto.getRoutineTrainingList().add(routineTrainingResponseDtoTreeMap.get(key));
        }

        routineTrainingListRepository.flush();

        return responseDto;
    }

    // 루틴 세트 추가
    @Override
    public void addSet(RoutineTrainingRequestDto requestDto){

        Routine routine = routineRepository.getReferenceById(requestDto.getRoutineId());
        Training training = trainingRepository.getReferenceById(requestDto.getTrainingId());

        RoutineTrainingList routineTrainingList = RoutineTrainingList
                .builder()
                .routine(routine)
                .training(training)
                .sequence(requestDto.getSequence())
                .kg(requestDto.getKg())
                .count(requestDto.getCount())
                .sets(requestDto.getSets())
                .build();
        routineTrainingListRepository.saveAndFlush(routineTrainingList);
    }
    //루틴 운동 추가 (리스트로)
    @Override
    @Transactional
    public void saveRoutineTrainings(Long routineId, List<Long> trainings){
        List<RoutineTrainingList> routineTrainingList = new ArrayList<>();
        Routine routine = routineRepository.getReferenceById(routineId);

        List<RoutineTrainingList> list = routineTrainingListRepository.findAllByRoutineRoutineId(routineId);
        int startIndex = !list.isEmpty() ? 1 + list.get(list.size() -1).getSequence() : 0;

        for (int i = 0; i < trainings.size(); i++){
            Training training = trainingRepository.getReferenceById(trainings.get(i));

            RoutineTrainingList routineTraining = RoutineTrainingList
                    .builder()
                    .training(training)
                    .routine(routine)
                    .sequence(startIndex + i)
                    .build();

            routineTrainingList.add(routineTraining);
        }
        routineTrainingListRepository.saveAllAndFlush(routineTrainingList);
    }

    // 루틴 세트 삭제
    @Override
    @Transactional
    public void removeSet(Long routineTrainingListId){
        routineTrainingListRepository.deleteById(routineTrainingListId);
    }

    //나만의 루틴 상세 삭제(일단 스톱)
    @Override
    @Transactional
    public void removeRoutine(Long routineId){
        routineTrainingListRepository.deleteAllByRoutineId(routineId);
        routineRepository.deleteById(routineId);
    }
    //루틴 상세 보기 편집 kg, 횟수 수정
    @Override
    @Transactional
    public void updateSet(RoutineSetRequestDto requestDto){
        log.info("service에서 로그 : {}", requestDto);
        routineTrainingListRepository.updateWithRoutineTrainingListIdAndKgAndCount(requestDto.getRoutineTrainingListId(), requestDto.getKg(), requestDto.getCount());
    }
    //루틴 운동 삭제
    @Override
    @Transactional
    public void removeTraining(Long routineId, Long trainingId){
        RoutineTrainingList routineTraining = routineTrainingListRepository.findLastOneWithRoutineIdAndTrainingId(routineId, trainingId);

        int sequence = routineTraining.getSequence();

        //운동 삭제
        routineTrainingListRepository.deleteWithRoutineIdAndTrainingId(routineId, trainingId);

        //삭제한 운동 다음에 있는 운동들 sequence 1씩 감소
        routineTrainingListRepository.updateWithRoutineIdAndSequence(routineId, sequence);
    }

    @Override
    @Transactional
    public void addTraining(List<UserTrainingDto> userTrainingDtoList, Long routineId){

        List<RoutineTrainingList> routineTrainingLists = new ArrayList<>();

        List<RoutineTrainingList> list = routineTrainingListRepository.findAllByRoutineRoutineId(routineId);

        int startIndex = !list.isEmpty() ? 1 + list.get(list.size() - 1).getSequence() : 0;

        for (int i = 0; i < userTrainingDtoList.size(); i++){

            UserTrainingDto userTrainingDto = userTrainingDtoList.get(i);

            Training training = trainingRepository.getReferenceById(userTrainingDto.getTrainingId());
            Routine routine = routineRepository.getReferenceById(routineId);
            for (int j = 0; j < userTrainingDto.getSets().size(); j++) {
                RoutineTrainingList routineTrainingList = RoutineTrainingList
                        .builder()
                        .routine(routine)
                        .training(training)
                        .sequence(startIndex + i)
                        .sets(j)
                        .kg(userTrainingDto.getSets().get(j).getKg())
                        .count(userTrainingDto.getSets().get(j).getCount())
                        .build();
                
                routineTrainingLists.add(routineTrainingList);
            }
        }
        routineTrainingListRepository.saveAllAndFlush(routineTrainingLists);
    }
}
