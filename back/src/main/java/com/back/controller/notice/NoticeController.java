package com.back.controller.notice;


import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.notice.NoticeDTO;
import com.back.service.notice.NoticeService;
import com.back.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping(value = "/notice")


public class NoticeController {

    @Autowired
    private final NoticeService noticeService;
//    private final CustomFileUtil fileUtil;

    @PostMapping("/register")
    public Map<String, Long> regNotice(NoticeDTO noticeDTO, @RequestParam("files") List<MultipartFile> files) {

//        List<String> uploadFileNames = fileUtil.saveFiles(files);
//        noticeDTO.setUploadFileNames(uploadFileNames);

        //서비스 호출
        Long noticeBno = noticeService.regNotice(noticeDTO);

        try {  // front의 fetching 진행모달창 1초동안 보이기
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Map.of("result", noticeBno);
    }

    @GetMapping("/read/{noticeBno}")
    public NoticeDTO getNotice(@PathVariable(name = "noticeBno") Long noticeBno) {
        return noticeService.getNotice(noticeBno);
    }
//
//    @GetMapping("/view/{fileName}")
//    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
//        return fileUtil.getFile(fileName);
//    }


    @GetMapping("/list")
    public PageResponseDTO<NoticeDTO> getNoticeList(PageRequestDTO pageRequestDTO) {
        return noticeService.getNoticeList(pageRequestDTO);
    }

    @PutMapping("/{noticeBno}")
    public Map<String, String> modNotice(@PathVariable(name = "noticeBno") Long noticeBno, NoticeDTO noticeDTO) {
        noticeDTO.setNoticeBno(noticeBno);
//        NoticeDTO oldNoticeDTO = noticeService.getNotice(noticeBno);
//        //기존의 파일들 (데이터베이스에 존재하는 파일들 - 수정 과정에서 삭제되었을 수 있음)
//        List<String> oldFileNames = oldNoticeDTO.getUploadFileNames();
//        //새로 업로드 해야 하는 파일들
//        List<MultipartFile> files = noticeDTO.getFiles();
//        //새로 업로드되어서 만들어진 파일 이름들
//        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
//        //화면에서 변화 없이 계속 유지된 파일들
//        List<String> uploadedFileNames = noticeDTO.getUploadFileNames();
//
//        //유지되는 파일들  + 새로 업로드된 파일 이름들이 저장해야 하는 파일 목록이 됨
//        if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
//            uploadedFileNames.addAll(currentUploadFileNames);
//        }
//        noticeService.modNotice(noticeDTO);
//
//        if (oldFileNames != null && oldFileNames.size() > 0) {
//            //지워야 하는 파일 목록 찾기
//            //예전 파일들 중에서 지워져야 하는 파일이름들
//            List<String> removeFiles = oldFileNames
//                    .stream()
//                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
//            //실제 파일 삭제
//            fileUtil.deleteFiles(removeFiles);
//        }
        return Map.of("RESULT", "SUCCESS");

    }

    @DeleteMapping("/{noticeBno}")
    public Map<String, String>  delNotice(@PathVariable(name = "noticeBno") Long noticeBno) {

//        //삭제해야할 파일들 알아내기
//        List<String> oldFileNames = noticeService.getNotice(noticeBno).getUploadFileNames();
//        noticeService.delNotice(noticeBno);
//        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

}
