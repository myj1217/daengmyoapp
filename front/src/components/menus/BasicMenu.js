import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import image from "../../images/logo.png";
import useCustomCart from "../../hooks/useCustomCart";
import ChatList from "../chat/ChatList";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setChatVisible, selectChatVisible, setNewMessageArrived, selectNewMessageArrived } from "../../slices/chatSlice";  
import { Stomp } from '@stomp/stompjs';
import { FaShoppingCart,FaUser } from "react-icons/fa";


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
    if (!showChatList && isLogin) {
      update();
    }
  }, [isLogin, showChatList]);

  const isMainPage = location.pathname === "/";

  const update = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/chat/email/${loginState.email}`, (message) => {
        console.log(message + "newwwwwwwwwwwww")
        dispatch(setNewMessageArrived({ email: loginState.email, newMessageArrived: true }));
      });
    });
  };

  const handleCloseChat = () => {
    dispatch(setChatVisible(false));
    dispatch(setNewMessageArrived(false));
  };

  return (
    <header className={`flex bg-green-100 text-green-800 p-4 w-full h-20 top-0 z-50 ${!isMainPage ? "" : "sticky shadow-md"}`}>
      <div className="container mx-auto flex justify-between items-center h-full w-full">
        {/* 로고 */}
        <Link to="/" className="text-lg font-bold">
          <img src={image} alt="logo" className="w-32 h-auto"></img>
        </Link>

        {/* 메뉴 */}
        <nav className="flex justify-center flex-grow">
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
          </ul>
        </nav>

        {/* 로그인/로그아웃/회원가입 */}
        <div className="flex items-center">
          
          {isLogin ? (
            <div className="flex gap-4">
               <Link
                  to="/member/mypage"
                  className="hover:text-amber-200 transition-colors duration-300 flex items-center"
                >
                  <FaUser className="w-5 h-5" /> 
                  
                </Link>

            <Link
                  to="/cart"
                  className="hover:text-amber-200 transition-colors duration-300 flex items-center"
                >
                  <FaShoppingCart className="w-5 h-5" /> 
                 {cartItems.length !== 0 && <div className="mb-2 ml-0.5 text-xs rounded-full bg-red-500 w-4 h-4 flex items-center justify-center text-white">
                    {cartItems.length}
                  </div>}
                </Link>
            <button
              onClick={clickLogout}
              className="hover:text-amber-200 transition-colors duration-300 cursor-pointer flex"
            >
              로그아웃
              
            </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/member/login"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                로그인
              </Link>
              <Link
                to="/member/register"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>

      {isLogin && (
        <>
          <button
            className="fixed right-8 bottom-96 z-50 p-2 bg-emerald-400 text-white rounded-full shadow-lg"
            onClick={() => {
              dispatch(setChatVisible(true));
              dispatch(setNewMessageArrived(false));
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
    </header>
  );
};

export default BasicMenu;
