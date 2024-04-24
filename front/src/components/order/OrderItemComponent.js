import React from "react";

const OrderItemComponent = ({
  ono,
  userId,
  impUid,
  orderName,
  totalPrice,
  buyerName,
  buyerTel,
  buyerEmail,
  buyerAddress,
  orderStatus,
  deliveryRequest,
}) => {
  return (
    <div>
      <div>
        <div>주문 번호: </div>
        <div>{impUid}</div>
      </div>
      <div>
        <div>주문자 이름: </div>
        <div>{buyerName}</div>
      </div>
      <div>
        <div>주문명: </div>
        <div>{orderName}</div>
      </div>
      <div>
        <div>주문자 전화번호: </div>
        <div>{buyerTel}</div>
      </div>
      <div>
        <div>결제 금액: </div>
        <div>{totalPrice}</div>
      </div>
      <div>
        <div>결제 상태: </div>
        <div>{orderStatus}</div>
      </div>
      <div>
        <div>배송지 주소: </div>
        <div>{buyerAddress}</div>
      </div>
      <div>
        <div>배송 요청사항: </div>
        <div>{deliveryRequest}</div>
      </div>
    </div>
  );
};

export default OrderItemComponent;
