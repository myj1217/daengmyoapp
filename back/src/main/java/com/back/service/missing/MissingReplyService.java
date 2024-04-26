package com.back.service.missing;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.missing.MissingReplyDTO;

public interface MissingReplyService {
    Long register(MissingReplyDTO missingReplyDTO);
    MissingReplyDTO read(Long mrno);
    void modify(MissingReplyDTO missingReplyDTO);
    void remove(Long mrno);
    // 실제 반환되어야 하는 타입은 Reply이 아니라 ReplyDTO타입이다.
    PageResponseDTO<MissingReplyDTO> getListOfMissing(Long mno, PageRequestDTO pageRequestDTO);
}
