package com.back.service.community;


import com.back.domain.community.Community;
import com.back.dto.community.CommunityDTO;
import com.back.repository.community.CommunityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
@Log4j2

public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;

    @Override
    public Long regCommunity(CommunityDTO communityDTO) {
        Community community = dtoToEnity(communityDTO);
        Community result = communityRepository.save(community);
        return result.getCommunityBno();

    }

    private Community dtoToEnity(CommunityDTO communityDTO) {

        Community community = Community.builder()
                .communityBno(communityDTO.getCommunityBno())
                .communityTitle(communityDTO.getCommunityTitle())
                .communityContent(communityDTO.getCommunityContent())
                .communityWriter(communityDTO.getCommunityWriter())
                .build();

        return community;
    }

//    @Override
//    public CommunityDTO getCommunity(Long communityBno) {
//        Optional<Community> result = communityRepository.selectOne(communityBno);
//        Community community = result.orElseThrow();
//        CommunityDTO communityDTO = entityToDTO(community);
//
//        return communityDTO;
//    }

    private CommunityDTO entityToDTO(Community community) {

        CommunityDTO communityDTO = CommunityDTO.builder()
                .communityBno(community.getCommunityBno())
                .communityTitle(community.getCommunityTitle())
                .communityContent(community.getCommunityContent())
                .communityWriter(community.getCommunityWriter())
                .build();
        return communityDTO;
    }

    @Override
    @Transactional
    public void modCommunity(CommunityDTO communityDTO) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityDTO.getCommunityBno());

        Community community = optionalCommunity.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        community.changeTitle(community.getCommunityTitle());
        community.changeContent(communityDTO.getCommunityContent());

        communityRepository.save(community);
    }

    @Override
    public void delCommunity(Long communityBno) {
        communityRepository.updateToDelete(communityBno);
    }


}
