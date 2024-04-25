package com.back.repository.animal;

import java.util.Optional;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.back.domain.animal.Animal;

public interface AnimalRepository extends JpaRepository<Animal,Long > {
    @EntityGraph(attributePaths = "imageList")
    @Query("select p from Animal p where p.ano = :ano")
    Optional<Animal> selectOne(@Param("ano") Long ano);

    @Query("select p, pi from Animal p left join p.imageList pi on pi.ord = 0 where p.delFlag = false or pi is null")
    Page<Object[]> selectList(Pageable pageable);

    @Modifying
    @Query("update Animal p set p.delFlag = :flag where p.ano = :ano")
    void updateToDelete(@Param("ano") Long ano, @Param("flag") boolean flag);

    @Query("select p, pi from Animal p left join p.imageList pi " +
            "where (p.aname like %:aname% or :aname is null) and (p.gender like %:gender% or :gender is null)")
    Page<Object[]> searchList(@Param("gender") String gender, @Param("aname") String aname, Pageable pageable);
}


