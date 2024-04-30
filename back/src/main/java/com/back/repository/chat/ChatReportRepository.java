package com.back.repository.chat;

import com.back.domain.chat.ChatReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatReportRepository extends JpaRepository<ChatReport, Long> {
    List<ChatReport> findAll();

    boolean existsByMessageId(Long messageId);
}
