package com.ssafy.backend.global.error;

import com.ssafy.backend.global.dto.Response;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.UserException;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity accessDeniedExceptionHandler(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Response.fail(HttpStatus.FORBIDDEN.name(), FORBIDDEN_EXCEPTION.getErrorMessage()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity authenticationExceptionHandler(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Response.fail(HttpStatus.UNAUTHORIZED.name(), AUTHENTICATION_EXCEPTION.getErrorMessage()));
    }

    @ExceptionHandler({ExecutionControl.UserException.class})
    public ResponseEntity userExceptionHandler(UserException ex) {
        ExceptionType exceptionType = ex.getExceptionType();
        return ResponseEntity.status(exceptionType.getHttpStatus())
                .body(Response.fail(exceptionType.name(), exceptionType.getErrorMessage()));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity methodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(Response.fail(HttpStatus.BAD_REQUEST.name(), "잘못된 요청입니다."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleDefaultExcpeiton(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.fail(HttpStatus.BAD_REQUEST.name(), "기본 에러"));
    }

}
