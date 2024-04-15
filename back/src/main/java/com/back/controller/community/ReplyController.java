package com.back.controller.community;


import com.back.dto.community.ReplyDTO;
import com.back.service.community.ReplyService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Log4j2
@RequestMapping("reply")

public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/register")
    public Long regReply(@Valid @RequestBody ReplyDTO replyDTO) {

        return replyService.regReply(replyDTO);
    }

    @PutMapping("{replyRno}")
    public void modReply(@PathVariable Long replyRno, @Valid @RequestBody ReplyDTO replyDTO) {
        replyDTO.setReplyRno(replyRno);
        replyService.modReply(replyDTO);
    }

    @DeleteMapping("/{replyRno}")
    public void delReply(@PathVariable Long replyRno) {
        replyService.delReply(replyRno);
    }
}
