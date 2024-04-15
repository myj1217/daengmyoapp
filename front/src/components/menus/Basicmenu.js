import React from "react";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <header className="bg-blue-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          댕묘앞
        </Link>
        <nav>
          <ul className="flex gap-8">
            {" "}
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
        <div>
          <Link
            to="member/login"
            className="bg-slate-700 py-2 px-4 rounded hover:bg-slate-600 transition-colors duration-300"
          >
            로그인
          </Link>
          <Link
            to="member/register"
            className="ml-2 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-500 transition-colors duration-300"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BasicMenu;
