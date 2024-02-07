package com.ssafy.backend.global.file.controller;

import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.file.dto.FileRequestDto;
import com.ssafy.backend.global.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/3d")
@RequiredArgsConstructor
@PreAuthorize("(hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')) and (#userId == authentication.principal.userId)")
public class FileController {

    private final FileService fileService;

    @PostMapping("/{user_id}/current")
    public ResponseEntity createCurrentAvatar(@PathVariable("user_id") Long userId,
                                            @RequestBody FileRequestDto fileRequestDto) {
        String result = fileService.createCurrentAvatar(userId, fileRequestDto);

        Map<String, String> map = new HashMap<>();
        map.put("url", result);

        return ResponseEntity.ok(Response.success(map));
    }

    @PostMapping("/{user_id}/target")
    public ResponseEntity createTargetAvatar(@PathVariable("user_id") Long userId,
                                            @RequestBody FileRequestDto fileRequestDto) {
        String result = fileService.createTargetAvatar(userId, fileRequestDto);

        Map<String, String> map = new HashMap<>();
        map.put("url", result);

        return ResponseEntity.ok(Response.success(map));
    }



}
