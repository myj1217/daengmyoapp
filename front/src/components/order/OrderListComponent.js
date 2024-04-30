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
  buyerAddressCode: 0,
  buyerDetailAddress: "",
  orderStatus: "",
  deliveryRequest: "",
};

const OrderListComponent = () => {
  const [order, setOrder] = useState(iniState);
  const { isLogin, loginState, exceptionHandle } = useCustomLogin();

  useEffect(() => {
    orderList(loginState.email)
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [isLogin]);

  return (
    <div className="p-8 w-full min-h-[calc(100vh-124px)]">
      {order.dtoList && order.dtoList.length > 0 ? (
        <div className="py-8 text-5xl border-b border-gray-300">
          주문내역({order.dtoList.length})
        </div>
      ) : (
        <div className="py-8 text-5xl border-b border-gray-300">
          주문내역(0)
        </div>
      )}

      {/* 주문 목록 */}
      {order.dtoList ? (
        <div id="order list">
          <ul>
            {order.dtoList.map((item) => (
              <OrderItemComponent {...item} key={item.ono} />
            ))}
          </ul>
        </div>
      ) : (
        <div>주문 목록을 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default OrderListComponent;
