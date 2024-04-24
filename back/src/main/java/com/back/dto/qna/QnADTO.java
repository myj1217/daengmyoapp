package com.back.dto.qna;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class QnADTO {
    private String name;
    private String email;
    private String message;

    public QnADTO(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

}
