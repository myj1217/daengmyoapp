package com.back.service.animal;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.back.domain.animal.Animal;
import com.back.domain.animal.AnimalImage;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.animal.AnimalDTO;
import com.back.repository.animal.AnimalRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional

public class AnimalServiceImpl implements AnimalService{
    private final AnimalRepository animalRepository;
    private final ModelMapper modelMapper;
    @Override
    public PageResponseDTO<AnimalDTO> getList(PageRequestDTO pageRequestDTO) {
        log.info("getList......");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("ano").descending());
        Page<Object[]> result = animalRepository.selectList(pageable);

        List<AnimalDTO> dtoList = result.get().map(arr -> {
            Animal animal = (Animal) arr[0];
            AnimalImage animalImage = (AnimalImage) arr[1];

            AnimalDTO animalDTO = AnimalDTO.builder()
                    .ano(animal.getAno())
                    .aname(animal.getAname())
                    .age(animal.getAge())
                    .gender(animal.getGender())
                    .notes(animal.getNotes())
                    .delFlag(animal.isDelFlag())
                    .build();

            if (animalImage != null) {
                String imageStr = animalImage.getFileName();
                animalDTO.setUploadFileNames(List.of(imageStr));
            }

            return animalDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<AnimalDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
    @Override
    public Long register(AnimalDTO animalDTO) {
        Animal animal = dtoToEntity(animalDTO);
        Animal result = animalRepository.save(animal);

        return result.getAno();
    }
    private Animal dtoToEntity(AnimalDTO animalDTO) {
        Animal animal = Animal.builder()
                .ano(animalDTO.getAno())
                .aname(animalDTO.getAname())
                .age(animalDTO.getAge())
                .notes(animalDTO.getNotes())
                .gender(animalDTO.getGender())
                .build();

        List<String> uploadFileNames = animalDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return animal;
        }

        uploadFileNames.forEach(uploadName -> {
            animal.addImageString(uploadName);
        });

        return animal;

    }
    @Override
    public AnimalDTO get(Long ano) {
        Optional<Animal> result = animalRepository.selectOne(ano);
        Animal animal = result.orElseThrow();
        AnimalDTO animalDTO = entityToDTO(animal);

        return animalDTO;

    }
    private AnimalDTO entityToDTO(Animal animal) {
        AnimalDTO animalDTO = AnimalDTO.builder()
                .ano(animal.getAno())
                .aname(animal.getAname())
                .gender(animal.getGender())
                .notes(animal.getNotes())
                .age(animal.getAge())
                .build();

        List<AnimalImage> imageList = animal.getImageList();

        if (imageList == null || imageList.isEmpty()) {
            return animalDTO;
        }

        List<String> fileNameList = imageList.stream()
                .map(animalImage->animalImage.getFileName())
                .toList();

        animalDTO.setUploadFileNames(fileNameList);

        return animalDTO;
    }
    @Override
    public void modify(AnimalDTO animalDTO) {
        // 상품 조회
        Optional<Animal> result = animalRepository.findById(animalDTO.getAno());
        Animal animal = result.orElseThrow();

        // 상품 정보 업데이트
        animal.changeName(animalDTO.getAname());
        animal.changeGender(animalDTO.getGender());
        animal.changeAge(animalDTO.getAge());
        animal.changeNotes(animalDTO.getNotes());

        // 기존 이미지 목록 제거 후 새 목록 추가
        animal.clearList();
        List<String> uploadFileNames = animalDTO.getUploadFileNames();

        if (uploadFileNames != null && uploadFileNames.size()>0) {
            uploadFileNames.stream().forEach(uploadName->{
                animal.addImageString(uploadName);
            });
        }
        animalRepository.save(animal);  // 변경 사항 저장
    }

    @Override
    public void remove(Long ano) {
        animalRepository.updateToDelete(ano, true);  // 상품 삭제 플래그 업데이트
    }

    @Override
    public PageResponseDTO<AnimalDTO> animalSearch(String aname, String gender, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("ano").descending());

        // 상품 검색 결과 조회
        Page<Object[]> result = animalRepository.searchList(aname, gender, pageable);

        // 조회된 데이터를 Map에 저장하여 중복 제거 및 데이터 정리
        Map<Long, AnimalDTO> animalDTOMap = new HashMap<>();

        result.getContent().forEach(arr -> {
            Animal animal = (Animal) arr[0];
            AnimalImage animalImage = (AnimalImage) arr[1];

            Long ano = animal.getAno();
            AnimalDTO dto = animalDTOMap.get(ano);
            if (dto == null) {
                dto = AnimalDTO.builder()
                        .ano(ano)
                        .aname(animal.getAname())
                        .gender(animal.getGender())
                        .age(animal.getAge())
                        .notes(animal.getNotes())
                        .delFlag(animal.isDelFlag())
                        .build();
                animalDTOMap.put(ano, dto);
            }

            List<String> uploadFileNames = dto.getUploadFileNames();
            if (uploadFileNames == null) {
                uploadFileNames = new ArrayList<>();
            }
            if (animalImage != null) {
                uploadFileNames.add(animalImage.getFileName());
                dto.setUploadFileNames(uploadFileNames);
            }
        });

        List<AnimalDTO> dtoList = new ArrayList<>(animalDTOMap.values());

        // 페이지 응답 DTO 생성 및 반환
        return PageResponseDTO.<AnimalDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .totalCount((int) result.getTotalElements())
                .build();
    }

}