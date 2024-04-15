package com.back.service.community;

import com.back.domain.community.Reply;
import com.back.dto.community.ReplyDTO;
import com.back.repository.community.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2


public class ReplyServiceImpl implements ReplyService  {

    private final ReplyRepository replyRepository;
    private final ModelMapper modelMapper;

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
