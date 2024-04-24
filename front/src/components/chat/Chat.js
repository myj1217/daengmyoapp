// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Client, Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// function ChatRoom({ userEmail, chatRoomId }) {

//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [stompClient, setStompClient] = useState(null);

//   const client = useRef({});


//   const connect = () => {
//     const socket = new WebSocket("ws://localhost:8080/ws");
//     stompClient.current = Stomp.over(socket);
//     stompClient.current.connect({}, () => {
//       stompClient.current.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
//         const newMessage = JSON.parse(message.body);
//         setChatMessages((prevMessages) => [...prevMessages, newMessage]);

//         // if (newMessage.senderSeq !== currentUser.userSeq) {
//         //   setCustomerSeq(newMessage.senderSeq);
//         // }
//       });
//     });
//     console.log("방 번호", chatRoomId);
//   };

  
//   useEffect(() => {
//     connect();
    
    
//   }, []);

//   useEffect(() => {
//     // 채팅 내역을 불러옵니다.
//     axios.get(`http://localhost:8080/api/chat/${chatRoomId}/history`)
//       .then(response => {
//         setChatMessages(response.data);
//       });

//     // // 웹소켓 연결을 생성합니다.
//     // const socket = new SockJS('http://localhost:8080/websocket');
//     // const client = Stomp.over(socket);

//     // client.connect({}, function(frame) {
//     //   // 채팅 메시지를 실시간으로 받습니다.
//     //   client.subscribe(`/topic/chat/${chatRoomId}`, function(chatMessage) {
//     //     setChatMessages(prevChatMessages => [...prevChatMessages, JSON.parse(chatMessage.body)]);
//     //   });
//     //   setStompClient(client);
//     // });

//     // return () => {
//     //   if (stompClient) {
//     //     stompClient.disconnect();
//     //   }
//     // };
//   }, [chatRoomId]);

//   const handleSendMessage = () => {
//     // 새로운 메시지를 보냅니다.
//     // if (newMessage.trim() !== '') {
//     //   stompClient.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify({
//     //     senderEmail: userEmail,
//     //     messageContent: newMessage,
//     //     sentAt: new Date()
//     //   }));
//     const messageObj = {
//         senderEmail: userEmail,
//         messageContent: newMessage,
//         sentAt: new Date()
//         };// 형식에 맞게 수정해서 보내야 함.
//         stompClient.current.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify(messageObj));
  
//       setNewMessage('');
//     };

//   return (
//     <div>
//       {chatMessages.length > 0 && chatMessages.map(chatMessage => (
//         <div key={chatMessage.id}>
//           <div>{chatMessage.senderEmail}</div>
//           <div>{chatMessage.messageContent}</div>
//           <div>{chatMessage.sentAt}</div>
//         </div>
//       ))}
//       <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatRoom;











import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import jwtAxios from '../../utils/jwtUtil';



function Chat({ userEmail, chatRoomId }) {
  // URL에서 채팅방 ID를 가져옴
  // 채팅 메시지 상태
  const [messages, setMessages] = useState([]);
  // 메시지 입력 상태
  const [message, setMessage] = useState("");
  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);
  // Redux store에서 현재 사용자 정보 가져오기
  const currentUser = useSelector((state) => state.user);
  // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
  const messagesEndRef = useRef(null);
  // 컴포넌트 마운트 시 실행. 웹소켓 연결 및 초기 메시지 로딩
  const [profileImg, setProfileImg] = useState(null);
  const [customerSeq, setCustomerSeq] = useState("");

  useEffect(() => {
    connect();
    fetchMessages();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [chatRoomId]);
  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (newMessage.senderSeq !== currentUser.userSeq) {
          setCustomerSeq(newMessage.senderSeq);
        }
      });
    });
    console.log("방 번호", chatRoomId);
  };
  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };
  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    jwtAxios
      .get(`http://localhost:8080/api/chat/${chatRoomId}/history`)
      .then((response) => {
        console.log("메시지 목록", response.data);
        setMessages(response.data);
      })
      .catch((error) => console.error("Failed to fetch chat messages.", error));
  };
  // 새 메시지를 보내는 함수
  const handleSendMessage = () => {
    if (stompClient.current && message) {
      const messageObj = {
        senderEmail: userEmail,
        messageContent: message,
        sentAt: new Date(),
      };
      stompClient.current.send(`/app/chat/${chatRoomId}`, {}, JSON.stringify(messageObj));
      setMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-auto p-4 ">
      {messages.length > 0 && messages.map(chatMessage => (
  !isNaN(new Date(chatMessage.sentAt).getTime()) && (
    <div key={chatMessage.id} className={`p-2 my-2 w-2/5 rounded shadow ${chatMessage.senderEmail === userEmail ? 'bg-blue-100 ml-auto' : 'bg-white mr-auto'}`}>
      <div className="font-bold text-indigo-500">{chatMessage.senderEmail}</div>
      <p className="text-gray-800">{chatMessage.messageContent}</p>
      <div className="text-sm text-gray-500">
        {new Date(chatMessage.sentAt).toLocaleString('ko-KR')}
      </div>
    </div>
  )
))}



        <div ref={messagesEndRef} />
      </div>
      <div className="flex-none">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-indigo-500"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSendMessage}
          className="w-full p-2 mt-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
        >
          보내기
        </button>
      </div>
    </div>
  );
}

export default Chat;