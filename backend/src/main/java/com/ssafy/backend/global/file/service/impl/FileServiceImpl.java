package com.ssafy.backend.global.file.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.FileException;
import com.ssafy.backend.global.error.exception.UserException;
import com.ssafy.backend.global.file.dto.FileRequestDto;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final AmazonS3Client amazonS3Client;
    private final UserRepository userRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    @Transactional
    public String createCurrentAvatar(Long userId, FileRequestDto fileRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));

        String assetId = fileRequestDto.getAssetId();

        if (assetId == null || assetId.isBlank()) {
            throw new FileException(NOT_FOUND_ASSET_ID);
        }

        String pathName = "src/main/resources/3d/" + assetId + ".obj";
        String objectName = assetId + ".obj";

        if (!amazonS3Client.doesObjectExist(bucket, objectName)) {
            String response = getResponse(fileRequestDto.getAvatarUrl());

            createObjFile(pathName);
            writeOjbFile(pathName, response);

            uploadS3(objectName, pathName);

            String url = "https://do9nz79ez57wg.cloudfront.net/" + objectName;
            user.updateCurrentAvatar(assetId, url);

            File file = new File(pathName);
            if (file.delete()) {
                log.info("파일 삭제 성공");
            } else {
                log.info("파일 삭제 실패");
            }   

        }
        return user.getCurrentAvatarUrl();
    }

    @Override
    @Transactional
    public String createTargetAvatar(Long userId, FileRequestDto fileRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));

        String assetId = fileRequestDto.getAssetId();

        if (assetId == null || assetId.isBlank()) {
           throw new FileException(NOT_FOUND_ASSET_ID);
        }

        String pathName = "src/main/resources/3d/" + assetId + ".obj";
        String objectName = assetId + ".obj";

        if (!amazonS3Client.doesObjectExist(bucket, objectName)) {
            String response = getResponse(fileRequestDto.getAvatarUrl());

            createObjFile(pathName);
            writeOjbFile(pathName, response);

            uploadS3(objectName, pathName);

            String url = "https://do9nz79ez57wg.cloudfront.net/" + objectName;
            user.updateCurrentAvatar(assetId, url);

            File file = new File(pathName);
            if (file.delete()) {
                log.info("파일 삭제 성공");
            } else {
                log.info("파일 삭제 실패");
            }
        }
        return user.getTargetAvatarUrl();
    }

    private void uploadS3(String objectName, String pathName) {
        File file = new File(pathName);
        if (!amazonS3Client.doesObjectExist(bucket, objectName)) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, objectName, file));
        }
    }

    private void createObjFile(String pathName) {
        Path path = Paths.get(pathName);
        try {
            Files.createFile(path);
        } catch (Exception ex) {
            log.info("{}", ex.toString());
            throw new FileException(FAIL_CREATE_FILE);
        }
    }

    private void writeOjbFile(String pathName, String response) {
        try {
            String filePath = Paths.get(pathName).toString();

            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
            writer.write(response);
            writer.close();
        } catch (Exception ex) {
            log.info("{}", ex.toString());
            throw new FileException(FAIL_WRITE_FILE);
        }

    }

    private String getResponse(String url)  {
        if (url == null || url.isBlank()) {
            throw new FileException(NOT_FOUND_AVATAR_URL);
        }

        try {
            HttpRequest request = HttpRequest .newBuilder()
                    .uri(new URI(url))
                    .GET()
                    .build();

            HttpResponse<String> httpResponse = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            return httpResponse.body();
        } catch (Exception ex) {
            log.info("{}", ex.toString());
            throw new FileException(FAIL_RESPONSE);
        }
    }

}
