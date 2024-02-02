package com.ssafy.backend.global.file.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.backend.domain.inbody.entity.InbodyImage;
import com.ssafy.backend.domain.inbody.repository.InbodyImageRepository;
import com.ssafy.backend.domain.inbody.repository.InbodyRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.FileException;
import com.ssafy.backend.global.file.dto.FileRequestDto;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_FILE;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final AmazonS3Client amazonS3Client;
    private final UserRepository userRepository;
    private final InbodyRepository inbodyRepository;
    private final InbodyImageRepository inbodyImageRepository;


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Override
    @Transactional
    public void uploadProfileImage(Long userId, FileRequestDto fileRequestDto) {
        userRepository.findById(userId).ifPresent(user -> {
            if (!amazonS3Client.doesObjectExist(bucket, fileRequestDto.getFileName())) {
                throw new FileException(INVALID_FILE);
            }
            user.updateProfileImage(fileRequestDto.getFileUrl());
        });
    }

    @Override
    @Transactional
    public void uploadInbodyImage(Long userId, Long inbodyId, FileRequestDto fileRequestDto) {
        inbodyRepository.findById(userId).ifPresent(inbody -> {
            if (!amazonS3Client.doesObjectExist(bucket, fileRequestDto.getFileName())) {
                throw new FileException(INVALID_FILE);
            }
            InbodyImage inbodyImage = InbodyImage.builder()
                    .inbody(inbody)
                    .url(fileRequestDto.getFileUrl())
                    .build();
            inbodyImageRepository.save(inbodyImage);

            inbody.addInbodyImage(inbodyImage);
            inbodyRepository.save(inbody);
        });
    }
}
