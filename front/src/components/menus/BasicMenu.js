import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import image from "../../images/logo.png";
import useCustomCart from "../../hooks/useCustomCart";

const BasicMenu = () => {
  const { isLogin, doLogout, moveToPath } = useCustomLogin();
  const location = useLocation();
  const { refreshCart, cartItems } = useCustomCart();

  const clickLogout = () => {
    doLogout();
    moveToPath("/");
  };

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  const isMainPage = location.pathname === "/";

  return (
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
                to="/"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                실종신고
              </Link>
            </li>
            <li>
              <Link
                to="/about"
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
              <Link
                to="/member/login"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                로그인
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default BasicMenu;
