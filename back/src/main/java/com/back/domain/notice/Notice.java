package com.back.domain.notice;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notice")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Notice {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeBno;

    @Column(length = 30, nullable = false)
    private String noticeTitle;

    @Column(length = 500, nullable = false)
    private String noticeContent;

    @Column(length = 10, nullable = false)
    private String noticeWriter;

    public void changeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    public void changeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }



}
