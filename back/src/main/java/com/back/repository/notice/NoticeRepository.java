package com.back.repository.notice;

import com.back.domain.community.Community;
import com.back.domain.notice.Notice;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @EntityGraph(attributePaths = "imageList")
    @Query("SELECT n FROM Notice n WHERE n.noticeBno = :noticeBno")
    Optional<Notice> findById(@Param("noticeBno") Long noticeBno);

    @Modifying
    @Query("UPDATE Notice n SET n.delFlag = :flag WHERE n.noticeBno = :noticeBno")
    void deleteByNoticeBno(@Param("noticeBno") Long noticeBno,@Param("flag") boolean flag);

    @Query("SELECT n, ni FROM Notice n LEFT JOIN n.imageList ni ON ni.nin = 0 WHERE n.delFlag = false OR ni IS NULL")
    Page<Object[]> selectList(Pageable pageable);
}
