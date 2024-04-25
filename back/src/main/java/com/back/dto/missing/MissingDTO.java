package com.back.dto.missing;

import lombok.*;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;



@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor


public class MissingDTO {
    private Long mno;
    private String mname;
    private int age;
    private String gender;
    private String description;
    private double latitude;
    private double longitude;
    private boolean delFlag;

    private LocalDateTime regDate;
    private LocalDateTime modDate;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}

