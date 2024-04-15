package com.back.service.community;

import com.back.dto.community.ReplyDTO;

public interface ReplyService {

    Long regReply(ReplyDTO replyDTO);

    void modReply(ReplyDTO replyDTO);

    void delReply(Long replyRno);


}
