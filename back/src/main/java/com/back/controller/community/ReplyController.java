package com.back.controller.community;


import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
import com.back.service.community.ReplyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Log4j2
@RequestMapping("/community/reply")
//@RequiredArgsConstructor

public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping("/{communityBno}")
    public PageResponseDTO<ReplyDTO> getReplyList(@PathVariable("communityBno")
                                                   Long communityBno, PageRequestDTO pageRequestDTO) {
        PageResponseDTO<ReplyDTO> responseDTO =
                replyService.getReplyList(communityBno, pageRequestDTO);
        return responseDTO;
    }

    @PostMapping("/register/{communityBno}")
    public Long regReply(@Valid @RequestBody ReplyDTO replyDTO) {

        return replyService.regReply(replyDTO);
    }

    @PutMapping("/{replyRno}")
    public void modReply(@PathVariable Long replyRno, @Valid @RequestBody ReplyDTO replyDTO) {
        replyDTO.setReplyRno(replyRno);
        replyService.modReply(replyDTO);
    }

    @DeleteMapping("/{replyRno}")
    public void delReply(@PathVariable Long replyRno) {
        replyService.delReply(replyRno);
    }
}
