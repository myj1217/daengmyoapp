package com.back.service.community;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
import com.back.dto.product.ProductReplyDTO;

public interface ReplyService {

    Long regReply(ReplyDTO replyDTO);
    ReplyDTO getReply(Long replyRno);

    void modReply(ReplyDTO replyDTO);

    void delReply(Long replyRno);


    PageResponseDTO<ReplyDTO> getReplyList(Long communityBno, PageRequestDTO pageRequestDTO);
}
