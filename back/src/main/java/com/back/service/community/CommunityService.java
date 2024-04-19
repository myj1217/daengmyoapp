package com.back.service.community;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.CommunityDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CommunityService {

    Long regCommunity(CommunityDTO communityDTO);

    void modCommunity(CommunityDTO communityDTO);

    void delCommunity(Long communityBno);

    CommunityDTO getCommunity (Long communityBno);

    PageResponseDTO<CommunityDTO> getCommunityList(PageRequestDTO pageRequestDTO);


}
