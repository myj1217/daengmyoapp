package com.back.dto.animal;

import lombok.*;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor


public class AnimalDTO {
    private Long ano;
    private String aname;
    private String gender;
    private int age;
    private String notes;
    private boolean delFlag;

    private LocalDateTime regDate;
    private LocalDateTime modDate;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}
