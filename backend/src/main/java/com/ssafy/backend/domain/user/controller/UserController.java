package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity getUserInfo(@PathVariable Long userId) {
        User user = userService.getUserInfo(userId);
        return ResponseEntity.ok(Response.success(UserInfoDto.from(user)));
    }

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity updateUser(@PathVariable Long userId) {
        return ResponseEntity.ok(Response.success());
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity withdraw(@PathVariable Long userId) {
        userService.updateStatus(userId);
        return ResponseEntity.ok(Response.success());
    }



    @GetMapping
    public ResponseEntity duplicateCheckNickname(@RequestParam String nickname) {
        if (userService.duplicateCheckNickname(nickname)) {
            return ResponseEntity.ok(Response.fail("", "중복된 닉네임이 존재합니다."));
        }
        return ResponseEntity.ok(Response.success());
    }

