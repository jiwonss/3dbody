package com.ssafy.backend.global.file.controller;

import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.file.dto.FileRequestDto;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
public class FileController {

    private final FileService fileService;

    @PostMapping("/{userId}/profile-image")
    public ResponseEntity uploadProfileImage(@PathVariable Long userId, @RequestBody FileRequestDto fileRequestDto) {
        fileService.uploadProfileImage(userId, fileRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/{userId}/{inbodyId}/inbody-image")
    public ResponseEntity uploadInbodyImage(@PathVariable Long userId, @PathVariable Long inbodyId, @RequestBody FileRequestDto fileRequestDto) {
        fileService.uploadInbodyImage(userId, inbodyId, fileRequestDto);
        return ResponseEntity.ok(Response.success());
    }

}
