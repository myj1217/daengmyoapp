package com.back.repository.product;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.back.domain.product.Product;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {
    @Autowired
    ProductRepository productRepository;

    @Test
    public void testInsertProduct() {
        for (int i = 1; i <= 10; i++) {
            Product product = Product.builder()
                    .pname("상품" + i)
                    .price(1000 * i)
                    .pdesc("상품설명 " + i)
                    .build();

            product.addImageString("product"+i+"_img_1.jpg");
            product.addImageString("product"+i+"_Img_2.jpg");
            product.addImageString("product"+i+"_Img_3.jpg");
            productRepository.save(product);

            log.info("-------------------");
        }
    }
}