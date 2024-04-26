package com.back.repository.missing;

import java.util.Optional;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.back.domain.missing.Missing;

public interface MissingRepository extends JpaRepository<Missing, Long> {
    @EntityGraph(attributePaths = "imageList")
    @Query("select p from Missing p where p.mno = :mno")
    Optional<Missing> selectOne(@Param("mno") Long mno);

    @Query("select p, pi from Missing p left join p.imageList pi on pi.ord = 0 where p.delFlag = false or pi is null")
    Page<Object[]> selectList(Pageable pageable);

    @Modifying
    @Query("update Missing p set p.delFlag = :flag where p.mno = :mno")
    void updateToDelete(@Param("mno") Long mno, @Param("flag") boolean flag);

    @Query("select p, pi from Missing p left join p.imageList pi " +
            "where (p.mname like %:mname% or :mname is null) and (p.gender like %:gender% or :gender is null)")
    Page<Object[]> searchList(@Param("gender") String gender, @Param("mname") String mname, Pageable pageable);
}
