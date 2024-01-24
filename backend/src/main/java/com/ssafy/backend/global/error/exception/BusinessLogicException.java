package com.ssafy.backend.global.error.exception;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {

    private final ExceptionType exceptionType;

    public BusinessLogicException(ExceptionType exceptionType) {
        super(exceptionType.getErrorMessage());
        this.exceptionType = exceptionType;
    }

    public BusinessLogicException(ExceptionType exceptionType, Throwable ex) {
        super(exceptionType.getErrorMessage(), ex);
        this.exceptionType = exceptionType;
    }

    public int getStatus() {
        return this.exceptionType.getHttpStatus().value();
    }

}
