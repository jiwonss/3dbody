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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequestDto signupRequestDto) {
        log.info("들어옴");
        authService.signup(signupRequestDto);
        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        UserInfoDto userInfoDto = authService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        TokenDto tokenDto = jwtService.issueToken(userInfoDto);

        Cookie accessToken = new Cookie("accessToken", tokenDto.getAccessToken());
        accessToken.setSecure(true);
        accessToken.setHttpOnly(true);
        accessToken.setMaxAge((int)tokenDto.getAccessTokenExpired());
        accessToken.setPath("/");
        Cookie refreshToken = new Cookie("refreshToken", tokenDto.getRefreshToken());
        refreshToken.setSecure(true);
        refreshToken.setHttpOnly(true);
        refreshToken.setMaxAge((int)tokenDto.getRefreshTokenExpired());
        refreshToken.setPath("/");
        response.addCookie(accessToken);
        response.addCookie(refreshToken);

        return ResponseEntity.ok(Response.success());
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
                                 @CookieValue("accessToken") Cookie access,
                                 @CookieValue("refreshToken") Cookie refresh,
                                 HttpServletResponse response) {
        jwtService.addBlackList(accessToken);

        access.setMaxAge(0);
        refresh.setMaxAge(0);
        response.addCookie(access);
        response.addCookie(refresh);

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

}
