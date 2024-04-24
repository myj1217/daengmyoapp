package com.back.repository.chat;

import com.back.domain.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByUserEmail1OrUserEmail2(String userEmail1, String userEmail2);

    ChatRoom findByUserEmail1AndUserEmail2(String userEmail1, String userEmail2);
}