package com.back.service.community;


import com.back.domain.community.Reply;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
import com.back.repository.community.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2


public class ReplyServiceImpl implements ReplyService  {

    private final ReplyRepository replyRepository;
    private final ModelMapper modelMapper;

    @Override
    public PageResponseDTO<ReplyDTO> getReplyList(PageRequestDTO pageRequestDTO) {
        log.info("getList..............");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,  //페이지 시작 번호가 0부터 시작하므로
                pageRequestDTO.getSize(),
                Sort.by("replyRno").descending());

        Page<Object[]> result = replyRepository.selectList(pageable);

        log.info("커뮤니티 게시글 리스트입니다. " + result);


        List<ReplyDTO> dtoList = result.get().map(arr -> {
            Reply reply = (Reply) arr[0];
//            CommunityImage communityImage = (CommunityImage) arr[1];

            ReplyDTO replyDTO = ReplyDTO.builder()
                    .replyRno(reply.getReplyRno())
                    .replyContent(reply.getReplyContent())
                    .replyWriter(reply.getReplyWriter())
                    .build();

//            // CommunityImage 객체가 null이 아닌 경우에만 이미지 파일명을 설정합니다.
//            if (communityImage != null) {
//                String imageStr = communityImage.getFileName();
//                communityDTO.setUploadFileNames(List.of(imageStr));
//            }

            return replyDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ReplyDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
    @Override
    public Long regReply(ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
        return reply.getReplyRno();
    }

    @Override
    public void modReply(ReplyDTO replyDTO) {
        Reply updatedReply = replyRepository.findById(replyDTO.getReplyRno())
                .orElseThrow(()-> new IllegalArgumentException(replyDTO.getReplyRno() + "댓글이 수정되었습니다."));

        updatedReply.changeContent(replyDTO.getReplyContent());
        replyRepository.save(updatedReply);
    }

    @Override
    public void delReply(Long replyRno) {replyRepository.deleteById(replyRno);}

    private Reply dtoToEntity(ReplyDTO replyDTO) {
        return modelMapper.map(replyDTO, Reply.class);
    }
}
