package com.back.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductReplyDTO {
    private Long prno;

    @NotNull
    private Long pno;

    @NotEmpty
    private String productReplyText;

    @NotEmpty
    private String productReplyer;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime regDate;

    @JsonIgnore// 댓글 수정 시간의 경우 화면에 출력할일이 없으므로 json으로 변환할때 제외.
    private LocalDateTime modDate;
}