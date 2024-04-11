package com.back.dto.community;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ReplyDTO {
    private Long replyRno;

    @NotNull
    private Long communityBno;

    @NotEmpty
    private String replyContent;

    @NotEmpty
    private String replyWriter;

}
