package com.ssafy.backend.global.file.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.backend.domain.inbody.repository.InbodyImageRepository;
import com.ssafy.backend.domain.inbody.repository.InbodyRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final AmazonS3Client amazonS3Client;
    private final UserRepository userRepository;
    private final InbodyRepository inbodyRepository;
    private final InbodyImageRepository inbodyImageRepository;


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

}
