package com.back.domain.notice;

import com.back.domain.community.CommunityImage;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private boolean delFlag;


    public void changeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    public void changeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }



    @ElementCollection
    @Builder.Default
    private List<NoticeImage> imageList = new ArrayList<>();


    public void addImage(NoticeImage image) {
        image.setNin(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName){
        NoticeImage noticeImage = NoticeImage.builder()
                .fileName(fileName)
                .build();
        addImage(noticeImage);
    }

    @Column(name = "registerDate")
    private LocalDateTime regDate;

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now();
    }

    public void clearList() {
        this.imageList.clear();
    }
}

