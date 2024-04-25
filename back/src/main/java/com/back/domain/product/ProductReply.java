package com.back.domain.product;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "ProductReply",
        indexes = {@Index(name = "idx_reply_product_pno", columnList = "product_pno")})
@EntityListeners(value = {AuditingEntityListener.class})// 데이터베이스에 추가되거나 변경될때 자동으로 시간 값을 지정할수 있다.
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString     ///(exclude = "board")
public class ProductReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prno;

    // FetchType.EAGER
    @ManyToOne(fetch = FetchType.LAZY)  // Many: Reply, One: Product
    private Product product;

    private String productReplyText;
    private String productReplyer;

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
        this.productReplyText = text;
    }
    public void changeStar(int star){
        this.star = star;
    }

    private int star;
}