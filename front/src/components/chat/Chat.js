import React, { useEffect, useState, useRef } from "react";
import jwtAxios from "../../utils/jwtUtil";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setChatVisible } from "../../slices/chatSlice";
import { Stomp } from "@stomp/stompjs";
import { CHAT_HOST } from "../../api/rootApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import { PiSiren } from "react-icons/pi";

function Chat({ userEmail, chatRoomId, onBackClick, userNick, onClose }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [reportingMessage, setReportingMessage] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingInfo, setReportingInfo] = useState(null);
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);
  const stompClient = useRef(null);

  useEffect(() => {
    fetchMessages();
    connect();
    scrollToBottom();

    return () => {
      if (stompClient) {
        disconnect();
      }
    };
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
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
      .get(`${API_SERVER_HOST}/api/chat/${chatRoomId}/history`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.error("Failed to fetch chat messages.", error));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
  

    if (stompClient && message) {
      const nowUtc = new Date();
      const koreaTime = new Date(nowUtc.getTime() + 9 * 60 * 60 * 1000);

      const messageObj = {
        senderEmail: userEmail,
        messageContent: message,
        // sentAt: koreaTime,
      };
      stompClient.current.send(
        `/app/chat/${chatRoomId}`,
        {},
        JSON.stringify(messageObj)
      );

      setMessage("");
    }
  };

  const handleReportClick = (message) => {
    setReportingInfo(message);
    setReportingMessage(message.messageContent);
    setShowReportModal(true);
  };

  const handleReportConfirm = () => {
    const reportData = {
        reporter: userEmail,
        sender: reportingInfo.senderEmail,
        sendTime: reportingInfo.sentAt,
        message: reportingInfo.messageContent,
        messageId: reportingInfo.id
    };

    jwtAxios.post(`${API_SERVER_HOST}/api/chat/report`, reportData)
        .then(response => {
            console.log("채팅 신고 완료:", response.data);
            alert(response.data);
        })
        .catch(error => {
            console.error("채팅 신고 실패:", error.response.data);
            alert(error.response.data);
        });

    // 모달 닫기
    setShowReportModal(false);
};


  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-emerald-400 sticky top-0 z-50 flex justify-between items-center px-4 py-2">
        <button onClick={onBackClick} className="text-white">
          <IoIosArrowBack className="w-10 h-10" />
        </button>
        <span className="text-white text-lg">{userNick}</span>
        <button onClick={onClose} className="text-white">
          <IoCloseSharp className="w-10 h-10" />
        </button>
      </div>
      <div className="flex-grow h-full overflow-auto p-4 mb-12">
        {messages.length > 0 &&
          messages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              style={{
                maxWidth: "100%",
                minWidth: "205px",
                width: `calc(${chatMessage.messageContent.length}ch + 2rem)`,
              }}
              className={`p-2 my-3 rounded shadow ${
                chatMessage.senderEmail === userEmail
                  ? "bg-green-100 ml-auto"
                  : "bg-white mr-auto"
              }`}
            >
              <div className="font-bold text-indigo-500">
                {chatMessage.senderEmail === userEmail ? "나" : userNick}
              </div>
              <p className="text-gray-800 break-all">{chatMessage.messageContent}</p>
              <div className="text-sm text-gray-500">
                {new Date(chatMessage.sentAt).toLocaleString("ko-KR")}
              </div>
              {chatMessage.senderEmail !== userEmail ? 
              <button onClick={() => handleReportClick(chatMessage)}
                className="w-full text-sm text-red-500 flex">
                <PiSiren className="ml-auto mt-0.5 w-4 h-auto" /> 신고
              </button>
              : <></>}
            </div>
          ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-col pt-4 mb-4 w-96 mt-auto fixed bottom-0">
        <form onSubmit={handleSendMessage} className="flex w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

      {/* 신고 모달 */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">[채팅 신고]</p>
            <p className="mb-2">해당 채팅을 신고하시겠습니까?</p>
           <p className="mb-4 text-center text-lg">" {reportingMessage} "</p>
           
            <div className="flex justify-end">
            <p className="text-red-400 mr-auto text-sm">*허위 신고가 누적될 경우 제재 될 수 있습니다.</p>
              <button
                className="px-4 py-2 ml-2 bg-red-500 text-white rounded mr-2 hover:bg-red-600"
                onClick={handleReportConfirm}
              >
                신고
              </button>
              <button
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                onClick={() => setShowReportModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
