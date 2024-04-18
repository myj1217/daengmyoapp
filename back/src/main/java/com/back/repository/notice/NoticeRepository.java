package com.back.repository.notice;

import com.back.domain.notice.Notice;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Notice n WHERE n.noticeBno = :noticeBno")
    void deleteByNoticeBno(@Param("noticeBno") Long noticeBno);

}
