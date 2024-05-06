package com.back.service.notice;

import com.back.domain.notice.Notice;
import com.back.domain.notice.NoticeImage;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.notice.NoticeDTO;
import com.back.repository.notice.NoticeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2

public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    // 공지 등록
    @Override
    public Long regNotice(NoticeDTO noticeDTO) {
        Notice notice = dtoToEntity(noticeDTO);
        Notice result = noticeRepository.save(notice);
        return result.getNoticeBno();
    }

    // 공지 수정
    @Override
    public void modNotice(NoticeDTO noticeDTO) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeDTO.getNoticeBno());
        Notice notice = optionalNotice.orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 존재하지 않습니다."));
        // 게시글 정보 변경
        notice.changeTitle(noticeDTO.getNoticeTitle());
        notice.changeContent(noticeDTO.getNoticeContent());

        // 업로드 파일을 초기화
        notice.clearList();

        // 업로드 파일을 추가
        List<String> uploadFileNames = noticeDTO.getUploadFileNames();

        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                notice.addImageString(uploadName);
            });
            log.info(notice + "수정이 완료 되었습니다.");
            // 변경된 게시글 정보를 저장합니다.
        }
        noticeRepository.save(notice);
    }

    // 공지 삭제
    @Override
    public void delNotice(Long noticeBno) {
        noticeRepository.deleteByNoticeBno(noticeBno, true);
    }

    // 공지 상세보기
    @Override
    public NoticeDTO getNotice(Long noticeBno) {
        Optional<Notice> result = noticeRepository.findById(noticeBno);
        Notice notice = result.orElseThrow();
        NoticeDTO noticeDTO = entityToDTO(notice);
        return noticeDTO;
    }

    // 공지사항 페이징
    @Override
    public PageResponseDTO<NoticeDTO> getNoticeList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1, // 페이지 시작 번호가 0부터 시작하므로
                pageRequestDTO.getSize(),
                Sort.by("noticeBno").descending());
        Page<Object[]> result = noticeRepository.selectList(pageable);

        List<NoticeDTO> dtoList = result.get().map(arr -> {
            Notice notice = (Notice) arr[0];
            NoticeImage noticeImage = (NoticeImage) arr[1];

            NoticeDTO noticeDTO = NoticeDTO.builder()
                    .noticeBno(notice.getNoticeBno())
                    .noticeTitle(notice.getNoticeTitle())
                    .noticeContent(notice.getNoticeContent())
                    .noticeWriter(notice.getNoticeWriter())
                    .delFlag(notice.isDelFlag())
                    .build();

            if (noticeImage != null) {
                String imageStr = noticeImage.getFileName();
                noticeDTO.setUploadFileNames(List.of(imageStr));
            }

            return noticeDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<NoticeDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    private Notice dtoToEntity(NoticeDTO noticeDTO) {
        Notice notice = Notice.builder()
                .noticeBno(noticeDTO.getNoticeBno())
                .noticeTitle(noticeDTO.getNoticeTitle())
                .noticeContent(noticeDTO.getNoticeContent())
                .noticeWriter(noticeDTO.getNoticeWriter())
                .build();
        // 업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = noticeDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return notice;
        }

        uploadFileNames.stream().forEach(uploadName -> {
            notice.addImageString(uploadName);
        });

        return notice;
    }

    private NoticeDTO entityToDTO(Notice notice) {
        NoticeDTO noticeDTO = NoticeDTO.builder()
                .noticeBno(notice.getNoticeBno())
                .noticeTitle(notice.getNoticeTitle())
                .noticeContent(notice.getNoticeContent())
                .noticeWriter(notice.getNoticeWriter())
                .build();

        List<NoticeImage> imageList = notice.getImageList();

        if (imageList == null || imageList.size() == 0) {
            return noticeDTO;
        }

        List<String> fileNameList = imageList.stream().map(noticeImage -> noticeImage.getFileName()).toList();

        noticeDTO.setUploadFileNames(fileNameList);
        return noticeDTO;
    }

}
