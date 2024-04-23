package com.back.controller.animal;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.back.dto.product.ProductDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.animal.AnimalDTO;
import com.back.service.animal.AnimalService;
import com.back.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/animal")
public class AnimalController {
    private final AnimalService animalService;
    private final CustomFileUtil fileUtil;

    // 동물 등록
    @PostMapping("/")
    public Map<String, Long> register(AnimalDTO animalDTO){
        log.info("register: " + animalDTO);

        // 파일 저장 및 파일 이름 설정
        List<MultipartFile> files = animalDTO.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        animalDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        // 동물 등록 서비스 호출
        Long ano = animalService.register(animalDTO);

        // 프론트엔드에서 사용자 인터페이스 처리 시간 지연
        try{
            Thread.sleep(1000);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
        return Map.of("result", ano);
    }

    // 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName){
        return fileUtil.getFile(fileName);
    }

    // 동물 목록 조회
    @GetMapping("/list")
    public PageResponseDTO<AnimalDTO> list(PageRequestDTO pageRequestDTO){
        return animalService.getList(pageRequestDTO);
    }

    // 특정 동물 조회
    @GetMapping("/{ano}")
    public AnimalDTO read(@PathVariable(name="ano") Long ano){
        return animalService.get(ano);
    }

    // 동물 정보 수정
    @PutMapping("/{ano}")
    public Map<String, String> modify(@PathVariable(name="ano")Long ano, AnimalDTO animalDTO) {
        animalDTO.setAno(ano);
        AnimalDTO oldAnimalDTO = animalService.get(ano);

        // 기존 파일들 처리
        List<String> oldFileNames = oldAnimalDTO.getUploadFileNames();
        List<MultipartFile> files = animalDTO.getFiles();
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        List<String> uploadedFileNames = animalDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size()>0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        // 동물 정보 수정 서비스 호출
        animalService.modify(animalDTO);

        if(oldFileNames != null && oldFileNames.size()>0){
            List<String> removeFiles = oldFileNames.stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    // 동물 삭제
    @DeleteMapping("/{ano}")
    public Map<String, String> remove(@PathVariable("ano") Long ano) {
        List<String> oldFileNames =  animalService.get(ano).getUploadFileNames();
        animalService.remove(ano);
        fileUtil.deleteFiles(oldFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

    // 동물 검색
    @GetMapping("/search")
    public PageResponseDTO<AnimalDTO> searchAnimals(String aname, String gender,
                                                    PageRequestDTO pageRequestDTO) {
        PageResponseDTO<AnimalDTO> responseDTO = animalService.animalSearch(gender, aname, pageRequestDTO);

        return responseDTO;
    }
}
