package com.back.service.chat;

import com.back.domain.chat.ChatMessage;
import com.back.domain.chat.ChatRoom;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatService {
    List<ChatMessage> getChatHistory(Long chatRoomId);
    ChatRoom createChatRoom(String userEmail1, String userEmail2);
    ChatMessage sendMessage(Long chatRoomId, String senderEmail, String messageContent, LocalDateTime sentAt);
    List<ChatRoom> getChatRooms(String userEmail);
}
