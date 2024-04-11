package com.back.repository.product;

import com.back.domain.product.ProductReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProductReplyRepository extends JpaRepository<ProductReply, Long> {
    // 특정 게시글에 해당하는 댓글을 페이징 처리하여 반환.
    @Query("select r from ProductReply r where r.product.pno = :pno")
    Page<ProductReply> listOfProduct(@Param("pno") Long pno, Pageable pageable);

    void deleteByProduct_Pno(Long pno);

}
