package com.back.service.missing;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.back.domain.missing.Missing;
import com.back.domain.missing.MissingImage;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.missing.MissingDTO;
import com.back.repository.missing.MissingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional

public class MissingServiceImpl implements MissingService {
    private final MissingRepository missingRepository;
    private final ModelMapper modelMapper;
    @Override
    public PageResponseDTO<MissingDTO> getList(PageRequestDTO pageRequestDTO) {
        log.info("getList......");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("mno").descending());
        Page<Object[]> result = missingRepository.selectList(pageable);

        List<MissingDTO> dtoList = result.get().map(arr -> {
            Missing missing = (Missing) arr[0];
            MissingImage missingImage = (MissingImage) arr[1];

            MissingDTO missingDTO = MissingDTO.builder()
                    .mno(missing.getMno())
                    .mname(missing.getMname())
                    .age(missing.getAge())
                    .gender(missing.getGender())
                    .description(missing.getDescription())
                    .latitude(missing.getLatitude())
                    .longitude(missing.getLongitude())
                    .delFlag(missing.isDelFlag())
                    .build();

            if (missingImage != null) {
                String imageStr = missingImage.getFileName();
                missingDTO.setUploadFileNames(List.of(imageStr));
            }

            return missingDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<MissingDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
    @Override
    public Long register(MissingDTO missingDTO) {
        Missing missing = dtoToEntity(missingDTO);
        Missing result = missingRepository.save(missing);

        return result.getMno();
    }
    private Missing dtoToEntity(MissingDTO missingDTO) {
        Missing missing = Missing.builder()
                .mno(missingDTO.getMno())
                .mname(missingDTO.getMname())
                .age(missingDTO.getAge())
                .gender(missingDTO.getGender())
                .description(missingDTO.getDescription())
                .latitude(missingDTO.getLatitude())
                .longitude(missingDTO.getLongitude())
                .build();

        List<String> uploadFileNames = missingDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return missing;
        }

        uploadFileNames.forEach(uploadName -> {
            missing.addImageString(uploadName);
        });

        return missing;

    }
    @Override
    public MissingDTO get(Long mno) {
        Optional<Missing> result = missingRepository.selectOne(mno);
        Missing missing = result.orElseThrow();
        MissingDTO missingDTO = entityToDTO(missing);

        return missingDTO;

    }
    private MissingDTO entityToDTO(Missing missing) {
        MissingDTO missingDTO = MissingDTO.builder()
                .mno(missing.getMno())
                .mname(missing.getMname())
                .age(missing.getAge())
                .gender(missing.getGender())
                .description(missing.getDescription())
                .latitude(missing.getLatitude())
                .longitude(missing.getLongitude())
                .build();

        List<MissingImage> imageList = missing.getImageList();

        if (imageList == null || imageList.isEmpty()) {
            return missingDTO;
        }

        List<String> fileNameList = imageList.stream()
                .map(missingImage->missingImage.getFileName())
                .toList();

        missingDTO.setUploadFileNames(fileNameList);

        return missingDTO;
    }
    @Override
    public void modify(MissingDTO missingDTO) {
        // 상품 조회
        Optional<Missing> result = missingRepository.findById(missingDTO.getMno());
        Missing missing = result.orElseThrow();

        // 상품 정보 업데이트
        missing.changeName(missingDTO.getMname());
        missing.changeGender(missingDTO.getGender());
        missing.changeAge(missingDTO.getAge());
        missing.changeDescription(missingDTO.getDescription());
        missing.changeLatitude(missing.getLatitude());
        missing.changeLongitude(missing.getLongitude());

        // 기존 이미지 목록 제거 후 새 목록 추가
        missing.clearList();
        List<String> uploadFileNames = missingDTO.getUploadFileNames();

        if (uploadFileNames != null && uploadFileNames.size()>0) {
            uploadFileNames.stream().forEach(uploadName->{
                missing.addImageString(uploadName);
            });
        }
        missingRepository.save(missing);  // 변경 사항 저장
    }

    @Override
    public void remove(Long mno) {
        missingRepository.updateToDelete(mno, true);  // 상품 삭제 플래그 업데이트
    }

    @Override
    public PageResponseDTO<MissingDTO> missingSearch(String mname, String gender, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("mno").descending());

        // 상품 검색 결과 조회
        Page<Object[]> result = missingRepository.searchList(mname, gender, pageable);

        // 조회된 데이터를 Map에 저장하여 중복 제거 및 데이터 정리
        Map<Long, MissingDTO> missingDTOMap = new HashMap<>();

        result.getContent().forEach(arr -> {
            Missing missing = (Missing) arr[0];
            MissingImage missingImage = (MissingImage) arr[1];

            Long mno = missing.getMno();
            MissingDTO dto = missingDTOMap.get(mno);
            if (dto == null) {
                dto = MissingDTO.builder()
                        .mno(missing.getMno())
                        .mname(missing.getMname())
                        .age(missing.getAge())
                        .gender(missing.getGender())
                        .description(missing.getDescription())
                        .latitude(missing.getLatitude())
                        .longitude(missing.getLongitude())
                        .delFlag(missing.isDelFlag())
                        .build();
                missingDTOMap.put(mno, dto);
            }

            List<String> uploadFileNames = dto.getUploadFileNames();
            if (uploadFileNames == null) {
                uploadFileNames = new ArrayList<>();
            }
            if (missingImage != null) {
                uploadFileNames.add(missingImage.getFileName());
                dto.setUploadFileNames(uploadFileNames);
            }
        });

        List<MissingDTO> dtoList = new ArrayList<>(missingDTOMap.values());

        // 페이지 응답 DTO 생성 및 반환
        return PageResponseDTO.<MissingDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .totalCount((int) result.getTotalElements())
                .build();
    }

}
