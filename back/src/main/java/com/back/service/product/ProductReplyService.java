package com.back.service.product;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.product.ProductReplyDTO;

public interface ProductReplyService{
    Long register(ProductReplyDTO productReplyDTO);
    ProductReplyDTO read(Long prno);
    void modify(ProductReplyDTO productReplyDTO);
    void  remove(Long prno);
    // 실제 반환되어야 하는 타입은 Reply이 아니라 ReplyDTO타입이다.
    PageResponseDTO<ProductReplyDTO> getListOfProduct(Long pno, PageRequestDTO pageRequestDTO);
}
