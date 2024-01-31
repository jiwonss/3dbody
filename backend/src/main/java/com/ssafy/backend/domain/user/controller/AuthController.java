package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.LoginRequestDto;
import com.ssafy.backend.domain.user.dto.ReissueDto;
import com.ssafy.backend.domain.user.dto.SignupRequestDto;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.ssafy.backend.global.error.exception.ExceptionType.DUPLICATED_EMAIL;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequestDto signupRequestDto) {
        log.info("회원가입 : {}", signupRequestDto);
        authService.signup(signupRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDto loginRequestDto) {
        log.info("로그인 : {}", loginRequestDto);

        UserInfoDto userInfoDto = authService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        TokenDto tokenDto = jwtService.issueToken(userInfoDto);
        log.info("로그인 결과(UserInfoDto) : {}", userInfoDto);
        log.info("로그인 결과(TokenDto) : {}", tokenDto);

        Map<String,Object> map = new HashMap<>();
        map.put("userInfo", userInfoDto);
        map.put("tokenDto", tokenDto);

        return ResponseEntity.ok(Response.success(map));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
                                 HttpServletResponse response) {
        jwtService.addBlackList(accessToken);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestBody ReissueDto reissueDto, HttpServletResponse response) {
        TokenDto tokenDto = authService.reissue(reissueDto.getRefreshToken());

        Cookie accessTokenCookie = new Cookie("accessToken", tokenDto.getAccessToken());
        accessTokenCookie.setMaxAge((int)tokenDto.getAccessTokenExpired());
        accessTokenCookie.setPath("/");
        Cookie refreshTokenCookie = new Cookie("refreshToken", tokenDto.getRefreshToken());
        refreshTokenCookie.setMaxAge((int)tokenDto.getRefreshTokenExpired());
        refreshTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(Response.success());
    }

    @GetMapping
    public ResponseEntity duplicateCheckEmail(@RequestParam String email) {
        if (authService.duplicateCheckEmail(email)) {
            return ResponseEntity.ok(Response.fail(DUPLICATED_EMAIL.getHttpStatus().toString(), DUPLICATED_EMAIL.getErrorMessage()));
        }
        return ResponseEntity.ok(Response.success(HttpStatus.OK.toString(), "성공"));
    }

}
