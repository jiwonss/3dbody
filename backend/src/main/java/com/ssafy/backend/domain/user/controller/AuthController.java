package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.LoginRequestDto;
import com.ssafy.backend.domain.user.dto.LoginResponseDto;
import com.ssafy.backend.domain.user.dto.ReissueDto;
import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequestDto signupRequestDto) {
        log.info("회원가입 - signupRequestDto : {}", signupRequestDto);

        authService.signup(signupRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDto loginRequestDto) {
        log.info("로그인 - loginRequestDto : {}", loginRequestDto);

        UserInfoDto userInfoDto = authService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        TokenDto tokenDto = jwtService.issueToken(userInfoDto);

        log.info("로그인 - userInfoDto : {}", userInfoDto);
        log.info("로그인 - tokenDto : {}", tokenDto);

        return ResponseEntity.ok(Response.success(
                LoginResponseDto.builder()
                        .userInfo(userService.getUserInfo(userInfoDto.getUserId()))
                        .token(tokenDto)
                        .build(),
                HttpStatus.OK.name(), "")
        );

    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken) {
        log.info("로그아웃 - accessToken : {}", accessToken);

        jwtService.addBlackList(accessToken);
        return ResponseEntity.ok((Response.success(HttpStatus.OK.name(), "")));

    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestBody ReissueDto reissueDto) {
        log.info("토큰 재발급 - reissueDto : {}", reissueDto);

        TokenDto tokenDto = authService.reissue(reissueDto.getRefreshToken());

        Map<String, Object> map = new HashMap<>();
        map.put("token", tokenDto);

        return ResponseEntity.ok(Response.success(map));

    }

    @GetMapping
    public ResponseEntity duplicateCheckEmail(@RequestParam String email) {
        log.info("이메일 중복 확인 - email : {}", email);

        authService.duplicateCheckEmail(email);
        return ResponseEntity.ok(Response.success(HttpStatus.OK.name(), ""));
    }

}
