package com.back.controller.missing;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.missing.MissingDTO;
import com.back.service.missing.MissingService;
import com.back.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/missing")
public class MissingController {
    private final MissingService missingService;
    private final CustomFileUtil fileUtil;

    // 동물 등록
    @PostMapping("/")
    public Map<String, Long> register(MissingDTO missingDTO){
        log.info("register: " + missingDTO);

        // 파일 저장 및 파일 이름 설정
        List<MultipartFile> files = missingDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        missingDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        // 동물 등록 서비스 호출
        Long mno = missingService.register(missingDTO);

        // 프론트엔드에서 사용자 인터페이스 처리 시간 지연
        try{
            Thread.sleep(1000);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
        return Map.of("result", mno);
    }

    // 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

    // 동물 목록 조회
    @GetMapping("/list")
    public PageResponseDTO<MissingDTO> list(PageRequestDTO pageRequestDTO){
        return missingService.getList(pageRequestDTO);
    }

    // 특정 동물 조회
    @GetMapping("/{mno}")
    public MissingDTO read(@PathVariable(name="mno") Long mno){
        return missingService.get(mno);
    }

    // 동물 정보 수정
    @PutMapping("/{mno}")
    public Map<String, String> modify(@PathVariable(name="mno")Long mno, MissingDTO missingDTO) {
        missingDTO.setMno(mno);
        MissingDTO oldMissingDTO = missingService.get(mno);

        // 기존 파일들 처리
        List<String> oldFileNames = oldMissingDTO.getUploadFileNames();
        List<MultipartFile> files = missingDTO.getFiles();
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        List<String> uploadedFileNames = missingDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size()>0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        // 동물 정보 수정 서비스 호출
        missingService.modify(missingDTO);

        if(oldFileNames != null && oldFileNames.size()>0){
            List<String> removeFiles = oldFileNames.stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    // 동물 삭제
    @DeleteMapping("/{mno}")
    public Map<String, String> remove(@PathVariable("mno") Long mno) {
        List<String> oldFileNames =  missingService.get(mno).getUploadFileNames();
        missingService.remove(mno);
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

    // 동물 검색
    @GetMapping("/search")
    public PageResponseDTO<MissingDTO> searchMissing(String mname, String gender,
                                                    PageRequestDTO pageRequestDTO) {
        PageResponseDTO<MissingDTO> responseDTO = missingService.missingSearch(gender, mname, pageRequestDTO);

        return responseDTO;
    }
}

