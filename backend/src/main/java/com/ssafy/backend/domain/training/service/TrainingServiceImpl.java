package com.ssafy.backend.domain.training.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import com.ssafy.backend.domain.training.entity.Rest;
import com.ssafy.backend.domain.training.entity.Training;
import com.ssafy.backend.domain.training.repository.RestRepository;
import com.ssafy.backend.domain.training.repository.TrainingRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;
    private final RestRepository restRepository;
    private final UserRepository userRepository;
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

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

    // 운동이미지 파일 삭제
    @Override
    public void deleteFile(Long trainingId) {
        log.info("운동이미지 파일 삭제 비즈니스 로직");
    }

    // 운동이미지 파일 추가
    @Override
    @Transactional
    public void uploadFile(Long trainingId, MultipartFile multipartFile) throws IOException {
        log.info("운동이미지 파일 추가 비즈니스 로직");
        String fileName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        File uploadFile = convert(fileName, multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile 형식을 File 형식으로 변환하는데 실패했습니다."));
        trainingRepository.updateWithTrainingIdAndImage(trainingId, "https://do9nz79ez57wg.cloudfront.net/" + fileName);
        s3.putObject(new PutObjectRequest(bucket, fileName, uploadFile));
        log.info("저장파일명: {}", fileName);
        boolean flag = uploadFile.delete();
        log.info("파일 삭제 성공 여부 {}", flag);
    }

    private Optional<File> convert(String fileName, MultipartFile file) throws IOException {

        File convertFile = new File(fileName);

        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}
