package com.back.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor


public class CommunityDTO {

    private Long communityBno;
    private String communityTitle;
    private String communityContent;
    private String communityWriter;

}
