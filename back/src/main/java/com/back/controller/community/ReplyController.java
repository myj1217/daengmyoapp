package com.back.controller.community;


import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
import com.back.dto.product.ProductReplyDTO;
import com.back.service.community.ReplyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/community/reply")
//@RequiredArgsConstructor

public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping("/list/{communityBno}")
    public PageResponseDTO<ReplyDTO> getReplyList(@PathVariable("communityBno")
                                                   Long communityBno, PageRequestDTO pageRequestDTO) {
        PageResponseDTO<ReplyDTO> responseDTO =
                replyService.getReplyList(communityBno, pageRequestDTO);
        log.info("댓글 목록: " + responseDTO.getDtoList());

        return responseDTO;
    }

    @PostMapping(value="/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> regReply(@Valid @RequestBody ReplyDTO replyDTO) {
        Map<String, Long> resultMap = new HashMap<>();
        Long replyRno = replyService.regReply(replyDTO);
        resultMap.put("replyRno", replyRno);
        return resultMap;
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
