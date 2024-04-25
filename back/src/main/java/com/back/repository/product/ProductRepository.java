package com.back.repository.product;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.back.domain.product.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
    @EntityGraph(attributePaths = "imageList")
    @Query("select p from Product p where p.pno = :pno")
    Optional<Product> selectOne(@Param("pno") Long pno);

    @Modifying
    @Query("update Product p set p.delFlag = :flag where p.pno = :pno")
    void updateToDelete(@Param("pno") Long pno, @Param("flag") boolean flag);

    // 이미지가 포함된 목록 처리
    // @Query("select p, pi  from Product p left join p.imageList pi  where pi.ord = 0 and p.delFlag = false ")
    // Page<Object[]> selectList(Pageable pageable);

    @Query("select p, pi from Product p left join p.imageList pi on pi.ord = 0 where p.delFlag = false or pi is null")
    Page<Object[]> selectList(Pageable pageable);

    // @Query("SELECT b, bi FROM ComBoard b LEFT JOIN b.imageList bi ON bi.brd = 0 WHERE b.delFlag = false OR bi IS NULL")
    // Page<Object[]> selectList(Pageable pageable);

    // 상품 검색
//     @Query("select p, pi from Product p left join p.imageList pi " +
//            "where (p.artist like %:artist% or :artist is null) and (p.pname like %:pname% or :pname is null)")
//     Page<Object[]> searchList(@Param("artist") String artist, @Param("pname") String pname, Pageable pageable);

}