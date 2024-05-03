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
  buyerAddressCode,
  buyerDetailAddress,
  orderStatus,
  deliveryRequest,
}) => {
  return (
    <li key={ono} className="w-full py-8 border-b border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex w-full py-1">
          <div className="w-1/4">주문 번호</div>
          <div className="w-3/4">{impUid}</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">주문명</div>
          <div className="w-3/4">{orderName}</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">수령인</div>
          <div className="w-3/4">{buyerName}</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">연락처</div>
          <div className="w-3/4">{buyerTel}</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">결제 금액</div>
          <div className="w-3/4">{totalPrice.toLocaleString("ko-KR")}원</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">결제 상태</div>
          <div className="w-3/4">{orderStatus}</div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">배송지 주소</div>
          <div className="w-3/4">
            <div>{buyerAddressCode}</div>
            <div>{buyerAddress}</div>
            <div>{buyerDetailAddress}</div>
          </div>
        </div>
        <div className="flex w-full py-1">
          <div className="w-1/4">배송 요청사항</div>
          <div className="w-3/4">{deliveryRequest}</div>
        </div>
      </div>
    </li>
  );
};

export default OrderItemComponent;
