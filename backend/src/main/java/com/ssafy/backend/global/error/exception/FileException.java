package com.ssafy.backend.global.error.exception;

public class FileException extends RuntimeException {

    private final ExceptionType exceptionType;

    public FileException(ExceptionType exceptionType) {
        super(exceptionType.getErrorMessage());
        this.exceptionType = exceptionType;
    }

    public FileException(ExceptionType exceptionType, Throwable ex) {
        super(exceptionType.getErrorMessage(), ex);
        this.exceptionType = exceptionType;
    }

    public int getStatus() {
        return this.exceptionType.getHttpStatus().value();
    }

}
