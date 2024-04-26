package com.back.domain.missing;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MissingImage {
    private String fileName;
    private int ord;
    public void setOrd(int ord){
        this.ord = ord;
    }
}
