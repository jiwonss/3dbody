package com.ssafy.backend.global.error.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionType {

    DUPLICATED_USER(HttpStatus.BAD_REQUEST, "이미 존재 하는 회원 입니다."),
    DUPLICATED_EMAIL(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일 입니다."),
    DUPLICATED_NICKNAME(HttpStatus.BAD_REQUEST, "이미 존재 하는 닉네임 입니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "잘못된 비밀번호 입니다."),
    INVALID_PIN(HttpStatus.BAD_REQUEST, "잘못된 PIN 입니다."),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST, "email을 다시 확인해 주세요"),
    INVALID_USER(HttpStatus.BAD_REQUEST, "존재하지 않는 사용자입니다."),
    WITHDRWA_USER(HttpStatus.BAD_REQUEST, "회원탈퇴한 사용자입니다."),

    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "사용할 수 없는 토큰 입니다."),

    CERTIFICATION_EXCEPTION(HttpStatus.UNAUTHORIZED, "자격 증명이 되어 있지 않습니다."),

    FORBIDDEN_EXCEPTION(HttpStatus.FORBIDDEN, "권한이 없습니다."),
    AUTHENTICATION_EXCEPTION(HttpStatus.UNAUTHORIZED, "인증되지 않은 요청입니다."),
    MAIL_SEND_FAILED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED_TO_SEND_MAIL"),

    INVALID_INBODY(HttpStatus.BAD_REQUEST, "존재하는 인바디 정보입니다."),

    INVALID_FILE(HttpStatus.BAD_REQUEST, "존재하지 않는 파일입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

}
