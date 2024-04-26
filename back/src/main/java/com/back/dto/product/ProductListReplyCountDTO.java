package com.back.dto.product;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductListReplyCountDTO {
    private Long pno;
    private String title;
    private String writer;
    private LocalDateTime regDate;
    private Long replyCount;
}
