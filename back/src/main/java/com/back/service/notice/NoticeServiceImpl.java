package com.back.service.notice;

import com.back.domain.notice.Notice;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.notice.NoticeDTO;
import com.back.repository.notice.NoticeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
//@RequiredArgsConstructor
@Transactional
@Log4j2

public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeServiceImpl(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @Override
    public Long regNotice(NoticeDTO noticeDTO) {
        Notice notice = dtoToEntity(noticeDTO);
        Notice result = noticeRepository.save(notice);
        return result.getNoticeBno();
    }

    @Override
    public void modNotice(NoticeDTO noticeDTO) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeDTO.getNoticeBno());
        Notice notice = optionalNotice.orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 존재하지 않습니다."));
        notice.changeTitle(noticeDTO.getNoticeTitle());
        notice.changeContent(noticeDTO.getNoticeContent());
        noticeRepository.save(notice);
    }

    @Override
    public void delNotice(Long noticeBno) {
        noticeRepository.deleteByNoticeBno(noticeBno);
    }

    @Override
    public NoticeDTO getNotice(Long noticeBno) {
        Optional<Notice> result = noticeRepository.findById(noticeBno);
        Notice notice = result.orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 존재하지 않습니다."));
        return entityToDTO(notice);

    }

    @Override
    public PageResponseDTO<NoticeDTO> getNoticeList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,  // 페이지 시작 번호가 0부터 시작하므로
                pageRequestDTO.getSize(),
                Sort.by("noticeBno").descending()
        );

        Page<Notice> result = noticeRepository.findAll(pageable);
        List<NoticeDTO> dtoList = result.getContent().stream()
                .map(notice -> entityToDTO(notice))
                .collect(Collectors.toList());

        return PageResponseDTO.<NoticeDTO>withAll()
                .dtoList(dtoList)
                .totalCount(result.getTotalElements())
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    private Notice dtoToEntity(NoticeDTO noticeDTO) {
        return Notice.builder()
                .noticeBno(noticeDTO.getNoticeBno())
                .noticeTitle(noticeDTO.getNoticeTitle())
                .noticeContent(noticeDTO.getNoticeContent())
                .noticeWriter(noticeDTO.getNoticeWriter())
                .build();
    }

    private NoticeDTO entityToDTO(Notice notice) {
        return NoticeDTO.builder()
                .noticeBno(notice.getNoticeBno())
                .noticeTitle(notice.getNoticeTitle())
                .noticeContent(notice.getNoticeContent())
                .noticeWriter(notice.getNoticeWriter())
                .build();
    }
}
