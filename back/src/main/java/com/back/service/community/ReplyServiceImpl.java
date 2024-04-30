package com.back.service.community;


import com.back.domain.community.Community;
import com.back.domain.community.Reply;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
import com.back.repository.community.CommunityRepository;
import com.back.repository.community.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2


public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final CommunityRepository communityRepository;
    private final ModelMapper modelMapper;


    @Override
    public Long regReply(ReplyDTO replyDTO) {
        Reply reply = Reply.builder()
                .community(Community.builder().communityBno(replyDTO.getCommunityBno()).build())
                .replyWriter(replyDTO.getReplyWriter())
                .replyContent(replyDTO.getReplyContent())
                .regDate(LocalDateTime.now(ZoneId.of("Asia/Seoul"))) // 한국 시간대로 설정
                .replyWriter(replyDTO.getReplyWriter())
                .writerEmail(replyDTO.getWriterEmail())
                .build();
        Reply result = replyRepository.save(reply);

        Community community = communityRepository.findByCommunityBno(replyDTO.getCommunityBno());
        community.increaseCommentCount();
        communityRepository.save(community);

        return reply.getReplyRno();
    }


    @Override
    public ReplyDTO getReply(Long replyRno) {
        Optional<Reply> replyOptional = replyRepository.findById(replyRno);
        Reply reply = replyOptional.orElseThrow();
        return modelMapper.map(reply, ReplyDTO.class);
    }

    @Override
    public void modReply(ReplyDTO replyDTO) {
        Optional<Reply> replyOptional = replyRepository.findById(replyDTO.getReplyRno());
        Reply reply = replyOptional.orElseThrow();
        reply.changeContent(replyDTO.getReplyContent());
        reply.updateTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        reply.changeModified();
        replyRepository.save(reply);
    }

    @Override
    public void delReply(Long replyRno) {

        Reply reply = replyRepository.findByReplyRno(replyRno);


        Community community = reply.getCommunity();

        community.decreaseCommentCount();
        communityRepository.save(community);

        replyRepository.deleteById(replyRno);

    }

    @Override
    public PageResponseDTO<ReplyDTO> getReplyList(Long communityBno, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() <= 0 ?
                        0 : pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("replyRno").descending());

        Page<Reply> result = replyRepository.getReplyList(communityBno, pageable); // selectList 메서드 수정 필요

        List<ReplyDTO> dtoList = result.getContent().stream()
                .map(reply -> modelMapper.map(reply, ReplyDTO.class))
                .collect(Collectors.toList());
        return PageResponseDTO.<ReplyDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }


//    private Reply dtoToEntity(ReplyDTO replyDTO) {
//        return modelMapper.map(replyDTO, Reply.class);
//    }
}
