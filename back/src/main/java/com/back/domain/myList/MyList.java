package com.back.domain.myList;


import com.back.domain.community.Community;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "myList")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MyList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long wno;

    @Column(length = 30, nullable = false) // communityTitle 필드 추가
    private String communityTitle;

    @Column(length = 10, nullable = false)
    private String communityWriter;

    @ManyToOne
    @JoinColumn(name = "community_bno")
    private Community community;



}
