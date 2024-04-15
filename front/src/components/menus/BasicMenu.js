import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const { isLogin, doLogout, moveToPath } = useCustomLogin();
  const { refreshCart, cartItems } = useCustomCart();

  // 로그아웃 핸들러
  const logoutHandler = () => {
    doLogout();
    moveToPath("/");
  };

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

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
                to="/products/"
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
          {!loginState.email ? (
            <>
              <Link
                to="/member/login"
                className="bg-slate-700 py-2 px-4 rounded hover:bg-slate-600 transition-colors duration-300"
              >
                로그인
              </Link>
              <Link
                to="/member/register"
                className="ml-2 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-500 transition-colors duration-300"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="bg-slate-700 py-2 px-4 rounded hover:bg-slate-600 transition-colors duration-300"
              >
                장바구니
              </Link>
              <div className="text-xs pl-1 ml-1 rounded-full bg-red-500 w-4 h-4">
                <Link to={"/cart"}>{cartItems.length}</Link>
              </div>
              <Link
                to="/member/mypage"
                className="ml-2 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-500 transition-colors duration-300"
              >
                마이페이지
              </Link>
              <Link
                to="/member/login"
                className="bg-slate-700 py-2 px-4 rounded hover:bg-slate-600 transition-colors duration-300"
              >
                <div onClick={logoutHandler}>로그아웃</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default BasicMenu;
