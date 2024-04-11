package com.back.dto.product;

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
public class ProductListAllDTO {
    private Long pno;
    private String pname;
    private int price;
    private boolean delFlag;

    private LocalDateTime regDate;
    private Long replyCount;

    // private List<BoardImageDTO> boardImages;
    @Builder.Default
    private List<MultipartFile> ProductImages = new ArrayList<>();

    @Builder.Default
    private List<String> uploadProductFileNames = new ArrayList<>();
}
