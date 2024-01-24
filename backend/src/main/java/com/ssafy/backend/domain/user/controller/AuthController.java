package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequestDto signupRequestDto) throws Exception {
        authService.signup(signupRequestDto);
        return ResponseEntity.ok().build();
    }

}
