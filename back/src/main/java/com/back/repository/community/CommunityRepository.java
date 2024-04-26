package com.back.repository.community;


import com.back.domain.community.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommunityRepository  extends JpaRepository <Community, Long> {

    @EntityGraph(attributePaths = "imageList")
    @Query("SELECT b FROM Community b WHERE b.communityBno = :communityBno")
    Optional<Community> selectOne(@Param("communityBno") Long communityBno);


    @Modifying
    @Query("UPDATE Community b SET b.delFlag = :flag WHERE b.communityBno = :communityBno")
    void updateToDelete(@Param("communityBno") Long communityBno, @Param("flag") boolean flag);


    // 이미지가 포함된 목록 처리
    @Query("SELECT b, bi FROM Community b LEFT JOIN b.imageList bi on bi.cin = 0 WHERE b.delFlag = false or bi is null")
    Page<Object[]> selectList(Pageable pageable);

    @Query("SELECT b, bi FROM Community b LEFT JOIN b.imageList bi on bi.cin = 0 WHERE (b.delFlag = false or bi is null) AND b.communityWriterEmail = :email")
    Page<Object[]> selectListByEmail(Pageable pageable, @Param("email") String email);


}
