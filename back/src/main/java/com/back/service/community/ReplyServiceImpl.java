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
    public PageResponseDTO<ReplyDTO> getReplyList(Long communityBno, PageRequestDTO pageRequestDTO) {
        log.info("getList..............");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,  //페이지 시작 번호가 0부터 시작하므로
                pageRequestDTO.getSize(),
                Sort.by("replyRno").descending());

        Page<Reply> result = replyRepository.selectList(communityBno, pageable); // selectList 메서드 수정 필요

        log.info("커뮤니티 댓글 리스트입니다. " + result);

        List<ReplyDTO> dtoList = result.getContent().stream()
                .map(reply -> modelMapper.map(reply, ReplyDTO.class))
                .collect(Collectors.toList());

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
