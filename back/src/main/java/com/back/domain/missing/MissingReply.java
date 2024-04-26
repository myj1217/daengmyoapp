package com.back.domain.missing;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "MissingReply",
        indexes = {@Index(name = "idx_reply_missing_mno", columnList = "missing_mno")})
@EntityListeners(value = {AuditingEntityListener.class})// 데이터베이스에 추가되거나 변경될 때 자동으로 시간 값을 지정할 수 있습니다.
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MissingReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mrno;


    @ManyToOne(fetch = FetchType.LAZY)  // Many: Reply, One: Missing
    private Missing missing;

    private String missingReplyText;
    private String missingReplyer;

    private String email;

    // 등록날짜
    @CreatedDate
    @Column(name = "regdate", updatable = false)
    private LocalDateTime regDate;

    // 수정날짜
    @LastModifiedDate
    @Column(name = "moddate")
    private LocalDateTime modDate;

    public void changeText(String text){
        this.missingReplyText = text;
    }
    public void changeStar(int star){
        this.star = star;
    }

    private int star;
}

