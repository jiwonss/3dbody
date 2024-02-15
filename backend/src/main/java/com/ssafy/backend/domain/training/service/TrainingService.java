package com.ssafy.backend.domain.training.service;

import com.ssafy.backend.domain.training.dto.TrainingResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TrainingService {

    // 운동 휴식여부
    boolean checkRest(Long userId, int year, int month, int day);

    // 운동 휴식등록
    void takeRest(Long userId, int year, int month, int day);

    // 운동 휴식해제
    void removeRest(Long userId, int year, int month, int day);

    // 운동 리스트(검색, 카테고리)
    List<TrainingResponseDto> searchTraining(String category, String keyword);

    // 운동이미지 파일 삭제
    void deleteFile(Long trainingId);

    // 운동이미지 파일 저장
    void uploadFile(Long trainingId, MultipartFile multipartFile) throws IOException;
}
