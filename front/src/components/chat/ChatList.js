import React, { useEffect, useRef, useState } from 'react';
import { API_SERVER_HOST } from '../../api/rootApi';
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from '../../utils/jwtUtil';
import Chat from './Chat';
import { getNick } from '../../api/memberApi';
import { Stomp } from '@stomp/stompjs'; // Stomp 라이브러리를 import합니다.
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setChatVisible } from "../../slices/chatSlice";

function ChatList({onClose, stompClient}) {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const { loginState } = useCustomLogin();
    // const stompClient = useRef(null);
    const dispatch = useDispatch();

    const fetchRooms = () =>{
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
                            // 채팅방을 마지막 메시지 시간에 따라 내림차순으로 정렬합니다.
                            chatRoomsWithNick.sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));
                            setChatRooms(chatRoomsWithNick);
                        });
                    } else {
                        console.error("에러:", response.data);
                    }
                })
                .catch(error => {
                    console.error("채팅방 목록을 불러오는 중 에러가 발생했습니다:", error);
                });
        }
    }

    const disconnect = () => {
        if (stompClient.current) {
          stompClient.current.disconnect();
        }
      };
    

    useEffect(() => {
        // 채팅방 목록을 가져옵니다.
        fetchRooms();
      
        // 구독을 만듭니다.
        if (stompClient) {
            stompClient.subscribe(`/topic/chat/email/${loginState.email}`, (message) => {
                fetchRooms();
            });
          }
      
        // 컴포넌트가 언마운트될 때 연결을 종료합니다.
        return () => {
            if (stompClient) {
              disconnect();
            }
          };
    }, [loginState.email, selectedChatRoom]);
    

    // const update = () => {
    //     const socket = new WebSocket("ws://localhost:8080/ws");
    //     stompClient.current = Stomp.over(socket);
    //     stompClient.current.connect({}, () => {
    //       stompClient.current.subscribe(`/topic/chat/${loginState.email}`, (message) => {
    //       fetchRooms(); 
    //     });
    //     })};


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
                <Chat userEmail={loginState.email} chatRoomId={selectedChatRoom.id} onBackClick={handleBackClick} userNick={selectedChatRoom.nick} stompClient={stompClient.current} onClose={onClose}/>
            ) : (
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className="w-full flex bg-emerald-400 sticky top-0 z-50 flex justify-between items-center px-4 py-2">
                        <div className="w-10 h-10"></div>
                        <span className="text-white text-lg">채팅방 목록</span>
                        <button onClick={onClose} className="text-white"><IoCloseSharp className="w-10 h-10" /></button>
                    </div>
                    {chatRooms.length > 0 ? chatRooms.map(chatRoom => (
                        <div key={chatRoom.id} className="my-2 border rounded-lg w-4/5">
                            <button 
                                className="w-full hover:bg-blue-50 text-black font-bold py-2 px-4"
                                onClick={() => handleChatRoomClick(chatRoom.id)}
                            >
                                <div className='flex flex-col'>
                                    <span className='ml-4 mr-auto'>{chatRoom.nick}</span>
                                    <span className='ml-4 text-gray-600 mr-auto py-2'>{chatRoom.lastMessage}</span>
                                    <span className='ml-4 text-gray-400 mr-auto py-2'>{new Date(chatRoom.lastTime).toLocaleString('ko-KR')}</span>
                                </div>
                            </button>
                        </div>
                    )) : (
                        <div className="mt-20 text-center text-lg text-gray-300">시작된 대화가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatList;
