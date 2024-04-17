package com.back.domain.community;


import jakarta.persistence.*;
import lombok.*;

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

    @Column(length = 10)
    private String replyWriter;

    public void changeContent(String updatedContent) {
        this.replyContent = updatedContent;
    }

}
