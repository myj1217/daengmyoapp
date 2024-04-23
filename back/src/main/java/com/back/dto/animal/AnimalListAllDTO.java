package com.back.dto.animal;

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

public class AnimalListAllDTO {
    private Long ano;
    private String aname;
    private String gender;
    private int age;
    private String notes;
    private boolean delFlag;

    private LocalDateTime regDate;

    @Builder.Default
    private List<MultipartFile> AnimalImages = new ArrayList<>();

    @Builder.Default
    private List<String> uploadAnimalFileNames = new ArrayList<>();

}
