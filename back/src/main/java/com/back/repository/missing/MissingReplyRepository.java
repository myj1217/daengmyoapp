package com.back.repository.missing;

import com.back.domain.missing.MissingReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MissingReplyRepository extends JpaRepository<MissingReply, Long> {

    @Query("select r from MissingReply r where r.missing.mno = :mno")
    Page<MissingReply> listOfMissing(@Param("mno") Long mno, Pageable pageable);

    void deleteByMissing_Mno(Long mno);
}
