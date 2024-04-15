import React from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import image from "../../images/logo.png"
const BasicMenu = () => {
  const { isLogin, doLogout, moveToPath } = useCustomLogin();

  const clickLogout = () => {
    doLogout();
    moveToPath("/");
  };
  return (
    <header className="flex bg-green-50 text-green-800 p-4 shadow-md w-full h-24 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full w-full">
        <Link to="/" className="text-lg font-bold">
        <img src={image} alt="logo" className="w-28 h-auto"></img>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link
                to="/adopt"
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
                to="/comunity"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                커뮤니티
              </Link>
            </li>
            <li>
              <Link
                to="/"
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
          </ul>
        </nav>
        <div className="">
          {isLogin ? (
            <button
              onClick={clickLogout}
              className="ml-2 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-500 transition-colors duration-300 text-white"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                to="/member/login"
                className="bg-slate-700 py-2 px-4 rounded hover:bg-slate-600 transition-colors duration-300 text-white"
              >
                로그인
              </Link>
              <Link
                to="/member/register"
                className="ml-2 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-500 transition-colors duration-300 text-white"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default BasicMenu;
