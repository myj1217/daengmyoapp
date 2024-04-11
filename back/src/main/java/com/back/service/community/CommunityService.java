package com.back.service.community;

import com.back.dto.community.CommunityDTO;

public interface CommunityService {

    Long regCommunity(CommunityDTO communityDTO);

    void modCommunity(CommunityDTO communityDTO);

    void delCommunity(Long communityBno);

}
