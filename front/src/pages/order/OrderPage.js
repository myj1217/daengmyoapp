import React from "react";
import OrderComponent from "../../components/order/OrderComponent";
import { useParams } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";
import { FaGift } from "react-icons/fa";

const OrderPage = () => {
  // const { totalPrice } = useParams();
  //   const { param } = useParams();
  //   const totalPrice = parseInt(param);

  return (
    <div>
      <BasicMenu />
      <div className="h-11 bg-emerald-500 text-white flex items-center pl-8 sticky top-0 z-50">
        <FaGift className="w-6 h-6 mr-2" />
        주문하기
      </div>
      <OrderComponent />
    </div>
  );
};

export default OrderPage;
