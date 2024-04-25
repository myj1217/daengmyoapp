package com.back.controller.chat;

import com.back.domain.chat.ChatMessage;
import com.back.domain.chat.ChatRoom;
import com.back.service.chat.ChatService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

// ChatController.java

@Log4j2
@AllArgsConstructor
@Controller
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/api/chat")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
        ChatRoom createdChatRoom = chatService.createChatRoom(chatRoom.getUserEmail1(), chatRoom.getUserEmail2());
        return ResponseEntity.ok(createdChatRoom);
    }

    @GetMapping("/api/chat/{userEmail}")
    public ResponseEntity<List<ChatRoom>> getChatRooms(@PathVariable String userEmail) {
        List<ChatRoom> chatRooms = chatService.getChatRooms(userEmail);
        return ResponseEntity.ok(chatRooms);
    }

    @GetMapping("/api/chat/{chatRoomId}/history")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long chatRoomId) {
        List<ChatMessage> chatHistory = chatService.getChatHistory(chatRoomId);
        return ResponseEntity.ok(chatHistory);
    }


    @MessageMapping("/chat/{chatRoomId}")
    public ResponseEntity<String> sendMessage(@DestinationVariable Long chatRoomId, ChatMessage chatMessage) {
        ChatMessage chatmessage = chatService.sendMessage(chatRoomId, chatMessage.getSenderEmail(), chatMessage.getMessageContent(), chatMessage.getSentAt());
        simpMessagingTemplate.convertAndSend("/topic/chat/" +chatRoomId, chatMessage);
        log.info(chatMessage+";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        return ResponseEntity.ok("메시지 전송 완료");
    }



}