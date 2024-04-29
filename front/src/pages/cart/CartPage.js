import React from "react";
import CartComponent from "../../components/cart/CartComponent";
// import BasicLayout from "../layouts/BasicLayout";
import { FaShoppingCart } from "react-icons/fa";
import BasicMenu from "../../components/menus/BasicMenu";

const CartPage = () => {
  return (
    <>
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <FaShoppingCart className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" /> 
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">장바구니</p>
      </div>
      <aside className="flex w-full px-5 py-5 bg-white text-black">
        {/* 상단 여백 py-40 wprj flex 제거 */}
        <CartComponent />
      </aside>
    </>
  );
};

export default CartPage;
