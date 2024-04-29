package com.back.service.chat;

import com.back.domain.chat.ChatMessage;
import com.back.domain.chat.ChatRoom;
import com.back.domain.member.Member;
import com.back.repository.chat.ChatMessageRepository;
import com.back.repository.chat.ChatRoomRepository;
import com.back.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MemberRepository memberRepository;
    @Override
    public List<ChatMessage> getChatHistory(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId);
    }

    @Override
    public ChatRoom createChatRoom(String userEmail1, String userEmail2) {
        Member member = memberRepository.findByEmail(userEmail1);
        String nickname = member.getNickname();

        // 이미 존재하는 채팅방인지 확인
        ChatRoom existingRoom = chatRoomRepository.findByUserEmail1AndUserEmail2(userEmail1, userEmail2);
        if (existingRoom != null) {
            // 이미 존재하는 채팅방이면 그대로 반환
            return existingRoom;
        }

        // 새로운 채팅방 생성
        ChatRoom chatRoom = ChatRoom.builder()
                .userEmail1(userEmail1)
                .userEmail2(userEmail2)
                .lastMessage(nickname+"님이 채팅방을 생성했습니다.")
                .lastTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

        chatRoomRepository.save(chatRoom);

        // 채팅방이 생성되었다는 메시지 생성


        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .senderEmail(userEmail1)
                .messageContent(nickname+"님이 채팅방을 생성했습니다.")
                .sentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

        chatMessageRepository.save(chatMessage);

        // 새 메시지 알림을 userEmail1과 userEmail2에게 보냅니다.
        simpMessagingTemplate.convertAndSend("/topic/chat/email/" + userEmail1, chatMessage);
        simpMessagingTemplate.convertAndSend("/topic/chat/email/" + userEmail2, chatMessage);

        return chatRoom;
    }

    @Override
    public ChatMessage sendMessage(Long chatRoomId, String senderEmail, String messageContent, LocalDateTime sentAt) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new IllegalArgumentException("ChatRoom not found: " + chatRoomId));

        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .senderEmail(senderEmail)
                .messageContent(messageContent)
                .sentAt(sentAt)
                .build();

        chatMessage = chatMessageRepository.save(chatMessage);
        chatRoom.setLastMessage(messageContent); // 마지막 메시지 업데이트
        chatRoom.setLastTime(sentAt);
        chatRoomRepository.save(chatRoom); // 변경사항 저장

        // 새 메시지 알림을 userEmail1과 userEmail2에게 보냅니다.
        simpMessagingTemplate.convertAndSend("/topic/chat/email/" + chatRoom.getUserEmail1(), chatMessage);
        simpMessagingTemplate.convertAndSend("/topic/chat/email/" + chatRoom.getUserEmail2(), chatMessage);

        return chatMessage;
    }

    @Override
    public List<ChatRoom> getChatRooms(String userEmail) {
        return chatRoomRepository.findByUserEmail1OrUserEmail2(userEmail, userEmail);
    }
}
