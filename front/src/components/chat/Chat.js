import React, { useEffect, useState, useRef } from "react";
import jwtAxios from '../../utils/jwtUtil';
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setChatVisible } from "../../slices/chatSlice";
import { Stomp } from '@stomp/stompjs'; // Stomp 라이브러리를 import합니다.
import { CHAT_HOST } from "../../api/rootApi";

function Chat({ userEmail, chatRoomId, onBackClick, userNick, onClose}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  
  const messagesEndRef = useRef(null);

  const stompClient = useRef(null);
  useEffect(() => {
    fetchMessages();
    connect();
    scrollToBottom(); // 페이지가 로드될 때마다 스크롤을 가장 아래로 이동합니다.

    return () => {
      if (stompClient) {
        disconnect();
      }
    };
  }, [chatRoomId]);


  useEffect(() => {
    scrollToBottom(); // 메시지가 추가될 때마다 스크롤을 가장 아래로 이동합니다.
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    const socket = new WebSocket(CHAT_HOST);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
        fetchMessages(); 
      });
    });
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  const fetchMessages = () => {
    jwtAxios
      .get(`http://localhost:8080/api/chat/${chatRoomId}/history`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.error("Failed to fetch chat messages.", error));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (stompClient && message) {
      const nowUtc = new Date();
      // 한국 시간대로 변환합니다 (UTC+9).
      const koreaTime = new Date(nowUtc.getTime() + (9 * 60 * 60 * 1000));
      
      const messageObj = {
        senderEmail: userEmail,
        messageContent: message,
        sentAt: koreaTime, // 한국 시간대의 Date 객체를 사용합니다.
      };
      stompClient.current.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify(messageObj));

    
      setMessage("");
    }
  };
  
  

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-emerald-400 sticky top-0 z-50 flex justify-between items-center px-4 py-2">
        <button onClick={onBackClick} className="text-white"><IoIosArrowBack className="w-10 h-10" /></button>
        <span className="text-white text-lg">{userNick}</span>
        <button onClick={onClose} className="text-white"><IoCloseSharp className="w-10 h-10" /></button>
      </div>
      <div className="flex-grow h-full overflow-auto p-4 mb-12">
        {messages.length > 0 && messages.map((chatMessage) => (
          <div key={chatMessage.id} style={{ maxWidth: '100%', minWidth:'205px',width: `calc(${chatMessage.messageContent.length}ch + 2rem)` }} className={`p-2 my-3 rounded shadow ${chatMessage.senderEmail === userEmail ? 'bg-green-100 ml-auto' : 'bg-white mr-auto'}`}>
            <div className="font-bold text-indigo-500">{chatMessage.senderEmail === userEmail ? '나' : userNick}</div>
            <p className="text-gray-800">{chatMessage.messageContent}</p>
            <div className="text-sm text-gray-500">
              {new Date(chatMessage.sentAt).toLocaleString('ko-KR')}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col pt-4 mb-4 w-96 mt-auto fixed bottom-0">
        <form onSubmit={handleSendMessage} className="flex w-full">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-grow p-2 ml-2 border-2 border-gray-200 rounded focus:outline-none focus:border-indigo-500"
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="submit"
            className="w-40 p-2 ml-1 mr-2 text-white bg-emerald-400 rounded hover:bg-emerald-500 focus:outline-none"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
