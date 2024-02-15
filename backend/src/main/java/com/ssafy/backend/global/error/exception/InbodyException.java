package com.ssafy.backend.global.error.exception;

import lombok.Getter;

@Getter
public class InbodyException extends RuntimeException {

    private final ExceptionType exceptionType;

    public InbodyException(ExceptionType exceptionType) {
        super(exceptionType.getErrorMessage());
        this.exceptionType = exceptionType;
    }

    public int getStatus() {
        return this.exceptionType.getHttpStatus().value();
    }

}
