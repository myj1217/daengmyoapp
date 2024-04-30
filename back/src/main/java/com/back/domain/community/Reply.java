package com.back.domain.community;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table (name = "reply" )
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long replyRno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Community community;

    @Column(length = 200)
    private String replyContent;

    @Column(length = 30)
    private String replyWriter;

    private String writerEmail;

    private boolean modified;


    public void changeContent(String updatedContent) {
        this.replyContent = updatedContent;
    }

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime regDate;

    public void updateTime(LocalDateTime updateTime) {
        this.regDate = updateTime;
    }

    public void changeModified() {
        this.modified = true;
    }
}
