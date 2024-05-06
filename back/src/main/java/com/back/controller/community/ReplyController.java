package com.back.controller.community;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.community.ReplyDTO;
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
@RequiredArgsConstructor

public class ReplyController {

    private final ReplyService replyService;

    // 댓글 리스트
    @GetMapping("/list/{communityBno}")
    public PageResponseDTO<ReplyDTO> getReplyListDto(@PathVariable("communityBno") Long communityBno,
            PageRequestDTO pageRequestDTO) {
        PageResponseDTO<ReplyDTO> responseDTO = replyService.getReplyList(communityBno, pageRequestDTO);
        log.info("댓글 목록: " + responseDTO.getDtoList());

        return responseDTO;
    }

    // 댓글 등록
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> regReply(@Valid @RequestBody ReplyDTO replyDTO) {
        Map<String, Long> resultMap = new HashMap<>();
        Long replyRno = replyService.regReply(replyDTO);
        resultMap.put("replyRno", replyRno);
        return resultMap;
    }

    // 댓글 수정
    @PutMapping("/{replyRno}")
    public void modReply(@PathVariable Long replyRno, @Valid @RequestBody ReplyDTO replyDTO) {
        replyDTO.setReplyRno(replyRno);
        replyService.modReply(replyDTO);
    }

    // 댓글 삭제
    @DeleteMapping("/{replyRno}")
    public void delReply(@PathVariable Long replyRno) {
        replyService.delReply(replyRno);
    }
}
