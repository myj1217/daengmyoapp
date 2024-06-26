package com.back.repository.community;

import com.back.domain.community.Community;
import com.back.domain.community.Reply;
import com.back.dto.community.ReplyDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReplyRepository extends JpaRepository <Reply,Long> {
    // 댓글 목록을 페이지로 가져오는 메서드
    @Query("SELECT r FROM Reply r WHERE r.community.communityBno = :communityBno")
    Page<Reply> getReplyList(@Param("communityBno")Long communityBno, Pageable pageable);

    Reply findByReplyRno(Long replyRno);
}
