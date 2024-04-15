package com.back.service.community;


import com.back.domain.community.Community;
import com.back.domain.community.CommunityImage;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.CommunityDTO;
import com.back.repository.community.CommunityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2

public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;

    @Override
    public PageResponseDTO<CommunityDTO> getCommunityList(PageRequestDTO pageRequestDTO) {
        log.info("getList..............");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,  //페이지 시작 번호가 0부터 시작하므로
                pageRequestDTO.getSize(),
                Sort.by("communityBno").descending());

        Page<Object[]> result = communityRepository.selectList(pageable);

        log.info("커뮤니티 게시글 리스트입니다. " + result);


        List<CommunityDTO> dtoList = result.get().map(arr -> {
            Community community = (Community) arr[0];
            CommunityImage communityImage = (CommunityImage) arr[1];

            CommunityDTO communityDTO = CommunityDTO.builder()
                    .communityBno(community.getCommunityBno())
                    .communityTitle(community.getCommunityTitle())
                    .communityContent(community.getCommunityContent())
                    .communityWriter(community.getCommunityWriter())
                    .build();

            // CommunityImage 객체가 null이 아닌 경우에만 이미지 파일명을 설정합니다.
            if (communityImage != null) {
                String imageStr = communityImage.getFileName();
                communityDTO.setUploadFileNames(List.of(imageStr));
            }

            return communityDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<CommunityDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

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
        //업로드 처리가 끝난 파일들의 이름 리스트
        List<String> uploadFileNames = communityDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return community;
        }

        uploadFileNames.stream().forEach(uploadName -> {
            community.addImageString(uploadName);
        });

        return community;
    }

    @Override
    public CommunityDTO getCommunity(Long communityBno) {
        Optional<Community> result = communityRepository.selectOne(communityBno);
        Community community = result.orElseThrow();
        CommunityDTO communityDTO = entityToDTO(community);

        return communityDTO;
    }

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
        // 게시글 번호로 게시글 정보 조회
        Optional<Community> optionalCommunity = communityRepository.findById(communityDTO.getCommunityBno());
        // Optional에서 게시글 정보를 가져옵니다.
        Community community = optionalCommunity.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        // 게시글 정보 변경
        community.changeTitle(communityDTO.getCommunityTitle());
        community.changeContent(communityDTO.getCommunityContent());

        // 업로드 파일을 초기화
        community.clearList();

        // 업로드 파일을 추가
        List<String> uploadFileNames = communityDTO.getUploadFileNames();

        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                community.addImageString(uploadName);
            });

            log.info(community + "수정이 완료 되었습니다.");

            // 변경된 게시글 정보를 저장합니다.
            communityRepository.save(community);
        }
    }

    @Override
    public void delCommunity(Long communityBno) {
        communityRepository.updateToDelete(communityBno);
    }


}
