package com.back.dto.missing;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MissingListReplyCountDTO {
    private Long bno;
    private String title;
    private String writer;
    private LocalDateTime regDate;
    private Long replyCount;
}
