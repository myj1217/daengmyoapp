import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import jwtAxios from '../../utils/jwtUtil';
import { IoIosArrowBack } from "react-icons/io";

function Chat({ userEmail, chatRoomId, onBackClick, userNick }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = useRef(null);
  const currentUser = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);
  const [customerSeq, setCustomerSeq] = useState("");

  useEffect(() => {
    connect();
    fetchMessages();
    return () => disconnect();
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        const sentAt = new Date(newMessage.sentAt);
        if (!isNaN(sentAt.getTime())) { // 날짜가 유효한 경우에만 상태 업데이트
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      
        if (newMessage.senderSeq !== currentUser.userSeq) {
          setCustomerSeq(newMessage.senderSeq);
        }
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
    if (stompClient.current && message) {
      const messageObj = {
        senderEmail: userEmail,
        messageContent: message,
        sentAt: new Date,
      };
      stompClient.current.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify(messageObj));
      setMessage("");
    }
  };

  return (
    <div className="w-full max-h-screen flex flex-col">
      <div className="w-full bg-emerald-400 sticky top-0 z-50 flex justify-between items-center px-4 py-2">
        <button onClick={onBackClick} className="text-white"><IoIosArrowBack className="w-8 h-8" /></button>
        <span className="text-white text-lg">{userNick}</span>
        <div className="w-8 h-8"></div>
      </div>
      <div className="flex-grow overflow-auto p-4 pb-0">

      {messages.length > 0 && messages.map((chatMessage) => (
  <div key={chatMessage.id} style={{ maxWidth: '100%', minWidth:'200px',width: `calc(${chatMessage.messageContent.length}ch + 2rem)` }} className={`p-2 my-3 rounded shadow ${chatMessage.senderEmail === userEmail ? 'bg-green-100 ml-auto' : 'bg-white mr-auto'}`}>
    <div className="font-bold text-indigo-500">{chatMessage.senderEmail === userEmail ? '나' : userNick}</div>
    <p className="text-gray-800">{chatMessage.messageContent}</p>
    <div className="text-sm text-gray-500">
      {new Date(chatMessage.sentAt).toLocaleString('ko-KR')}
    </div>
  </div>
))}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col w-full pt-4 mb-4">
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
            className="w-40 p-2 ml-1 mr-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
