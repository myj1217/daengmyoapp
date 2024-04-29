package com.back.repository.product;

import com.back.domain.product.Product;
import com.back.domain.product.ProductReply;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;

import java.time.LocalDateTime;

@SpringBootTest
@Log4j2
public class ProductReplyRepositoryTests {
    @Autowired
    private ProductReplyRepository productReplyRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testInsertReview(){
        Long pno = 1L;
        // 상품 후기를 추가할 상품의 pno 값을 가져옴
        Product product = Product.builder().pno(pno).build();
        // 상품 후기 생성
        ProductReply productReply = ProductReply.builder()
                .product(product)
                .productReplyText("철수철수김철수")
                .productReplyer("김철수")
                .regDate(LocalDateTime.now())
                .modDate(LocalDateTime.now())
                .build();
        // 상품 후기 저장
        productReplyRepository.save(productReply);
    }

    @Transactional// 데이터베이스 연산을 하나의 작업 단위로 묶는 역할.
    @Test
    public void testProductReplies() {
        Long pno = 7L;
        // 페이지 및 정렬 정보 설정
        Pageable pageable = PageRequest.of(0,10,
                Sort.by("prno").descending());
        Page<ProductReply> result = productReplyRepository.listOfProduct(pno, pageable);
        // 조회된 댓글 정보 출력
        result.getContent().forEach(reply -> {
            log.info(reply);
        });
    }

    @Test
    @Transactional
    @Commit
    public void testRemoveAll(){
        Long pno = 1L;
        // 해당 상품의 모든 댓글 삭제
        productReplyRepository.deleteByProduct_Pno(pno);
        // 해당 상품 삭제
        productRepository.deleteById(pno);
    }
}