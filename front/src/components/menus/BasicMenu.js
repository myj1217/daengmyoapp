import React, { useEffect,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import image from "../../images/logo.png";
import useCustomCart from "../../hooks/useCustomCart";
import ChatList from "../chat/ChatList";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setChatVisible, selectChatVisible, setNewMessageArrived, selectNewMessageArrived } from "../../slices/chatSlice";  
import { Stomp } from '@stomp/stompjs';

const BasicMenu = () => {
  const { isLogin, doLogout, moveToPath } = useCustomLogin();
  const location = useLocation();
  const { refreshCart, cartItems } = useCustomCart();
  const { loginState } = useCustomLogin();
  const stompClient = useRef(null);

  const dispatch = useDispatch();
  const showChatList = useSelector(selectChatVisible);

  const newMessageArrived = useSelector(selectNewMessageArrived);


  const clickLogout = () => {
    doLogout();
    moveToPath("/");
  };

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
    if(!showChatList && isLogin){
    update();
    }

  }, [isLogin, showChatList]);

  const isMainPage = location.pathname === "/";

  const update = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/chat/email/${loginState.email}`, (message) => {
        console.log(message+"newwwwwwwwwwwww")
        dispatch(setNewMessageArrived({ email: loginState.email, newMessageArrived: true })); // 새로운 메시지가 도착하면 newMessageArrived 상태를 true로 설정합니다.
      });
    });
  };

    const handleCloseChat = () => {
      dispatch(setChatVisible(false));
      dispatch(setNewMessageArrived(false)); // 채팅을 닫으면 newMessageArrived 상태를 false로 설정합니다.
    };

  return (
    <div>
    <header
      className={`flex bg-green-50 text-green-800 p-4 w-full h-20 top-0 z-50 ${
        !isMainPage ? "" : "sticky shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-full w-full">
        <Link to="/" className="text-lg font-bold">
          <img src={image} alt="logo" className="w-32 h-auto"></img>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link
                to="/animal"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                분양 받기
              </Link>
            </li>
            <li>
              <Link
                to="/products/list"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                펫shop
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                커뮤니티
              </Link>
            </li>
            <li>
              <Link
                to="/notice"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                공지
              </Link>
            </li>
            <li>
              <Link
                to="/missing/report"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                실종신고
              </Link>
            </li>
            <li>
              <Link
                to="/qna"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                문의하기
              </Link>
            </li>
            {isLogin && (
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="hover:text-amber-200 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-1">장바구니</span>
                  <div className="text-xs rounded-full bg-red-500 w-4 h-4 flex items-center justify-center text-white">
                    {cartItems.length}
                  </div>
                </Link>
              </div>
            )}
            {isLogin ? (
              <li
                onClick={clickLogout}
                className="hover:text-amber-200 transition-colors duration-300 cursor-pointer"
              >
                로그아웃
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/member/login"
                    className="hover:text-amber-200 transition-colors duration-300"
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    to="/member/register"
                    className="hover:text-amber-200 transition-colors duration-300"
                  >
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      
    </header>
    {isLogin && ( // 로그인 상태일 때만 채팅 버튼을 표시합니다.
        <>
          <button
            className="fixed right-4 bottom-4 z-50 p-2 bg-emerald-400 text-white rounded-full shadow-lg"
            onClick={() => {
              dispatch(setChatVisible(true));
              dispatch(setNewMessageArrived(false)); // 채팅을 열면 newMessageArrived 상태를 false로 설정합니다.
            }}
          >
            <IoChatbubbleEllipsesSharp className="w-9 h-9" />
            {newMessageArrived && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                N
              </span>
            )}
          </button>
          {showChatList && (
            <div className="fixed bg-white w-96 right-4 z-50 bottom-2 h-2/3 overflow-auto rounded-lg shadow-lg">
              <ChatList onClose={handleCloseChat} stompClient={stompClient.current}/>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BasicMenu;