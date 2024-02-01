package com.ssafy.backend.global.file.service;

import com.ssafy.backend.global.file.dto.FileRequestDto;

public interface FileService {

    void uploadProfileImage(Long userId, FileRequestDto fileRequestDto);
    void uploadInbodyImage(Long userId, Long inbodyId, FileRequestDto fileRequestDto);
}
