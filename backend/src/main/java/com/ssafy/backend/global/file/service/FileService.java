package com.ssafy.backend.global.file.service;

import com.ssafy.backend.global.file.dto.FileRequestDto;

public interface FileService {

    String createCurrentAvatar(Long userId, FileRequestDto fileRequestDto);
    String createTargetAvatar(Long userId, FileRequestDto fileRequestDto);

}
