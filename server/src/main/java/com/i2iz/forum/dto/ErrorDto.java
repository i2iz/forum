package com.i2iz.forum.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorDto {
    private final int status;
    private final String message;
    private final LocalDateTime timestamp = LocalDateTime.now();

    public ErrorDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
