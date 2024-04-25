package com.back.dto.product;

import lombok.*;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long pno;
    private String pname;
    private String artist;
    private int price;
    private String pdesc;
    private boolean delFlag;
    private String email;

    private LocalDateTime regDate;
    private LocalDateTime modDate;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}