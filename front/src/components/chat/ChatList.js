import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_SERVER_HOST } from '../../api/rootApi';
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from '../../utils/jwtUtil';
import Chat from './Chat';
import { getNick } from '../../api/memberApi';

function ChatList() {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const { loginState } = useCustomLogin();

    useEffect(() => {
        if (!selectedChatRoom) {
            jwtAxios.get(`${API_SERVER_HOST}/api/chat/${loginState.email}`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        Promise.all(response.data.map(async (chatRoom) => {
                            const otherUserEmail = chatRoom.userEmail1 === loginState.email ? chatRoom.userEmail2 : chatRoom.userEmail1;
                            // 이메일 주소가 유효한지 확인
                            if (otherUserEmail) {
                                const nick = await getNick(otherUserEmail);
                                return { ...chatRoom, nick };
                            }
                            return chatRoom; // 이메일 주소가 없으면 닉네임 없이 반환
                        }))
                        .then(chatRoomsWithNick => {
                            setChatRooms(chatRoomsWithNick);
                        });
                    } else {
                        console.error("Expected an array of chat rooms, but received:", response.data);
                    }
                })
                .catch(error => {
                    console.error("채팅방 목록을 불러오는 중 에러가 발생했습니다:", error);
                });
        }
    }, [loginState.email, selectedChatRoom]);

    const handleChatRoomClick = (chatRoomId) => {
        const room = chatRooms.find(room => room.id === chatRoomId);
        if (room) {
            setSelectedChatRoom(room);
        }
    };

    const handleBackClick = () => {
        setSelectedChatRoom(null);
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            
            
            {selectedChatRoom ? (
    <Chat userEmail={loginState.email} chatRoomId={selectedChatRoom.id} onBackClick={handleBackClick} userNick={selectedChatRoom.nick}/>
) : (
    <>
        <div className="w-full bg-emerald-400 sticky top-0 z-50 flex text-white justify-center items-center h-12">
            채팅 목록
        </div>
        {chatRooms.map(chatRoom => (
            <div key={chatRoom.id} className="my-2 border rounded-lg w-4/5">
                <button 
                    className="w-full hover:bg-blue-50 text-black font-bold py-2 px-4"
                    onClick={() => handleChatRoomClick(chatRoom.id)}
                >
                    <div className='flex flex-col'>
                        <span className='ml-4 mr-auto'>{chatRoom.nick}</span>
                        <span className='ml-4 text-gray-500 mr-auto py-2'>{chatRoom.lastMessage}</span>
                    </div>
                </button>
            </div>
        ))}
    </>
)}

        </div>
    );
}

export default ChatList;
