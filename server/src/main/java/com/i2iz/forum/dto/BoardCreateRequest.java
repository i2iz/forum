package com.i2iz.forum.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardCreateRequest {
    private String title;
    private String content;
    private String tags;
    private Long categoryId;
}