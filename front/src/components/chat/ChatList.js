// ChatList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SERVER_HOST } from '../../api/rootApi';
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from '../../utils/jwtUtil';
import Chat from './Chat';  // Chat import

function ChatList({  }) {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);  // 선택된 채팅방 상태 추가
    const { loginState } = useCustomLogin();
    useEffect(() => {
        jwtAxios.get(`${API_SERVER_HOST}/api/chat/${loginState.email}`)
            .then(response => {
                setChatRooms(Array.isArray(response.data) ? response.data : []);
            });
    }, []);

    const handleChatRoomClick = (chatRoomId) => {  // 채팅방 클릭 핸들러 추가
        setSelectedChatRoom(chatRoomId);
    };

    return (
        <div>
            {chatRooms.map(chatRoom => {
                const otherUserEmail = chatRoom.userEmail1 === loginState.email ? chatRoom.userEmail2 : chatRoom.userEmail1;
                return (
                    <div key={chatRoom.id}>
                        <button onClick={() => handleChatRoomClick(chatRoom.id)}>"{otherUserEmail}"님과의 채팅방</button>
                    </div>
                );
            })}
            {selectedChatRoom && <Chat userEmail={loginState.email} chatRoomId={selectedChatRoom} />} 
        </div>
    );
}

export default ChatList;
