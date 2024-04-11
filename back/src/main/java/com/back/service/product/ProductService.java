package com.back.service.product;

import org.springframework.transaction.annotation.Transactional;

import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.product.ProductDTO;

@Transactional
public interface ProductService {
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);
    Long register(ProductDTO productDTO);
    ProductDTO get(Long pno);
    void modify(ProductDTO productDTO);
    void remove(Long pno);
    PageResponseDTO<ProductDTO> productSearch(String artist, String pname, PageRequestDTO pageRequestDTO);
}