package com.back.service.missing;

import com.back.dto.missing.MissingDTO;
import org.springframework.transaction.annotation.Transactional;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;

@Transactional
public interface MissingService {
    PageResponseDTO<MissingDTO> getList(PageRequestDTO pageRequestDTO);
    Long register(MissingDTO missingDTO);
    MissingDTO get(Long mno);
    void modify(MissingDTO missingDTO);
    void remove(Long mno);
    PageResponseDTO<MissingDTO> missingSearch(String mname, String gender, PageRequestDTO pageRequestDTO);
}


