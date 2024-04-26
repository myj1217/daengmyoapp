package com.back.controller.missing;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.missing.MissingReplyDTO;
import com.back.service.missing.MissingReplyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/missing/replies")
@Log4j2
@RequiredArgsConstructor
public class MissingReplyController {
    private final MissingReplyService missingReplyService;

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> register(@Valid @RequestBody MissingReplyDTO missingReplyDTO) {
        log.info(missingReplyDTO);

        Map<String, Long> resultMap = new HashMap<>();
        Long mrno = missingReplyService.register(missingReplyDTO);
        resultMap.put("mrno", mrno);

        return resultMap;
    }

    @GetMapping(value = "/list/{mno}")
    public PageResponseDTO<MissingReplyDTO> getList(@PathVariable("mno") Long mno,
                                                    PageRequestDTO pageRequestDTO){
        PageResponseDTO<MissingReplyDTO> responseDTO =
                missingReplyService.getListOfMissing(mno, pageRequestDTO);

        return responseDTO;
    }

    @GetMapping(value = "/{mrno}")
    public MissingReplyDTO getMissingReplyDTO(@PathVariable("mrno") Long mrno){
        MissingReplyDTO missingReplyDTO = missingReplyService.read(mrno);

        return missingReplyDTO;
    }

    @DeleteMapping(value = "/{mrno}")
    public Map<String, Long> remove(@PathVariable("mrno") Long mrno){
        missingReplyService.remove(mrno);
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("mrno", mrno);

        return resultMap;
    }

    @PutMapping(value = "/{mrno}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> modify(@PathVariable("mrno") Long mrno,
                                    @RequestBody MissingReplyDTO missingReplyDTO){
        missingReplyDTO.setMrno(mrno); // 번호를 일치 시킴
        missingReplyService.modify(missingReplyDTO);
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("mrno", mrno);

        return resultMap;
    }
}
