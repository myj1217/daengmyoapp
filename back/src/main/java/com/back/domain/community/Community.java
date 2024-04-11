package com.back.domain.community;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "community")
@Getter
@ToString
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

    @Column(length = 10, nullable = false)
    private String communityWriter;

    public void changeTitle(String communityTitle) {
        this.communityTitle = communityTitle;
    }

    public void changeContent(String communityContent) {
        this.communityContent = communityContent;
    }
}
