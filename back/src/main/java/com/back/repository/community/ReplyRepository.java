package com.back.repository.community;

import com.back.domain.community.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository <Reply,Long> {
    Page<Object[]> selectList(Pageable pageable);
}
