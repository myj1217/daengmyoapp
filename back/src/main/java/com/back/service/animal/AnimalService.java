package com.back.service.animal;

import org.springframework.transaction.annotation.Transactional;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.animal.AnimalDTO;

@Transactional
public interface AnimalService {
    PageResponseDTO<AnimalDTO> getList(PageRequestDTO pageRequestDTO);
    Long register(AnimalDTO animalDTO);
    AnimalDTO get(Long ano);
    void modify(AnimalDTO animalDTO);
    void remove(Long ano);
    PageResponseDTO<AnimalDTO> animalSearch(String aname, String gender, PageRequestDTO pageRequestDTO);
}


