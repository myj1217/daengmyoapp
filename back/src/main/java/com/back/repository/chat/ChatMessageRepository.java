package com.back.repository.chat;

import com.back.domain.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// ChatMessageRepository.java
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatRoomIdOrderBySentAtDesc(Long chatRoomId);
}
