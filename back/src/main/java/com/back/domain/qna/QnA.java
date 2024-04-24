package com.back.domain.qna;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class QnA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String message;

    // 생성자, getter 및 setter 생략

    public QnA() {}

    public QnA(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
