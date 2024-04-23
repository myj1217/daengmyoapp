package com.back.domain.animal;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnimalImage {
    private String fileName;
    private int ord;
    public void setOrd(int ord){
        this.ord = ord;
    }
}
