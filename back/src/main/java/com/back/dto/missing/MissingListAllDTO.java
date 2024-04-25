package com.back.dto.missing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MissingListAllDTO {
    private Long mno;
    private String mname;
    private int age;
    private String gender;
    private String description;
    private double latitude;
    private double longitude;
    private boolean delFlag;

    private LocalDateTime regDate;

    @Builder.Default
    private List<MultipartFile> MissingImages = new ArrayList<>();

    @Builder.Default
    private List<String> uploadMissingFileNames = new ArrayList<>();

}
