import { useEffect, useState } from "react";
import { orderList } from "../../api/orderApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import OrderItemComponent from "./OrderItemComponent";

const iniState = {
  ono: 0,
  userId: "",
  impUid: "",
  orderName: "",
  totalPrice: 0,
  buyerName: "",
  buyerTel: "",
  buyerEmail: "",
  buyerAddress: "",
  orderStatus: "",
  deliveryRequest: "",
};

const OrderComponent = () => {
  const [order, setOrder] = useState(iniState);
  const { isLogin, loginState, exceptionHandle } = useCustomLogin();

  useEffect(() => {
    // 상품 리뷰
    orderList(loginState.email)
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => exceptionHandle(err));
  }, []);

  return (
    <div>
      {order.dtoList && order.dtoList.length > 0 ? (
        <div className="my-10 text-5xl">주문내역({order.dtoList.length})</div>
      ) : (
        <div className="my-10 text-5xl">주문내역(0)</div>
      )}

      {/* 주문 목록 */}
      <div id="order list">
        <ul>
          {order.dtoList.map((item) => (
            <OrderItemComponent
              {...item}
              key={item.ono}
              // reviewRedirect={reviewRedirect}
              // pno={pno}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderComponent;
