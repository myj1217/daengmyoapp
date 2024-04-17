package com.back.controller.product;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.product.ProductReplyDTO;
import com.back.service.product.ProductReplyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/products/replies")
@Log4j2
@RequiredArgsConstructor
public class ProductReplyController {
    private final ProductReplyService productReplyService;
    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> register(@Valid @RequestBody ProductReplyDTO productReplyDTO) {
        log.info(productReplyDTO);

        Map<String, Long> resultMap = new HashMap<>();
        Long prno = productReplyService.register(productReplyDTO);
        resultMap.put("prno", prno);

        return resultMap;
    }

    @GetMapping(value = "/list/{pno}")
    public PageResponseDTO<ProductReplyDTO> getList(@PathVariable("pno") Long pno,
                                             PageRequestDTO pageRequestDTO){
        PageResponseDTO<ProductReplyDTO> responseDTO =
                productReplyService.getListOfProduct(pno, pageRequestDTO);

        return responseDTO;
    }

    @GetMapping(value = "/{prno}")
    public ProductReplyDTO getProductReplyDTO(@PathVariable("prno") Long prno){
        ProductReplyDTO productReplyDTO = productReplyService.read(prno);

        return productReplyDTO;
    }

    @DeleteMapping(value = "/{prno}")
    public Map<String, Long> remove(@PathVariable("prno") Long prno){
        productReplyService.remove(prno);
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("prno", prno);

        return resultMap;
    }

    @PutMapping(value = "/{prno}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> modify(@PathVariable("prno") Long prno,
                                    @RequestBody ProductReplyDTO productReplyDTO){
        productReplyDTO.setPrno(prno);//번호를 일치 시킴
        productReplyService.modify(productReplyDTO);
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("prno", prno);

        return resultMap;
    }
}