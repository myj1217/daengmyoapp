package com.back.service.notice;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.notice.NoticeDTO;

public interface NoticeService {
    Long regNotice(NoticeDTO noticeDTO);

    void modNotice(NoticeDTO noticeDTO);

    void delNotice(Long noticeBno);

    NoticeDTO getNotice (Long noticeBno);

    PageResponseDTO<NoticeDTO> getNoticeList(PageRequestDTO pageRequestDTO);


}
