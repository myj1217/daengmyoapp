package com.back.domain.community;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "community")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Community {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityBno;

    @Column(length = 30, nullable = false)
    private String communityTitle;

    @Column(length = 500, nullable = false)
    private String communityContent;

    @Column(nullable = false)
    private String communityWriter;

    @Column(nullable = false)
    private String communityWriterEmail;

    private boolean delFlag;

//    public void changeDel(boolean delFlag) {
//        this.delFlag = delFlag;
//    }


    public void changeTitle(String communityTitle) {
        this.communityTitle = communityTitle;
    }

    public void changeContent(String communityContent) {
        this.communityContent = communityContent;
    }

    @ElementCollection
    @Builder.Default
    private List<CommunityImage> imageList = new ArrayList<>();


    public void addImage(CommunityImage image) {
        image.setCin(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName){
        CommunityImage communityImage = CommunityImage.builder()
                .fileName(fileName)
                .build();
        addImage(communityImage);
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

