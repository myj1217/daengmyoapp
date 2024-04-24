import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentResult = ({
  merchant_uid,
  amount,
  buyer_name,
  buyer_tel,
  buyer_email,
  buyer_addr,
  buyer_postcode,
  buyer_detailaddr,
}) => {
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate("/");
  };

  const redirectToOrderList = () => {
    navigate("/member/mypage?order");
  };

  return (
    <div>
      <p>주문이 완료되었습니다!</p>
      <ul>
        <li>
          <span>주문번호: </span>
          <span>{merchant_uid}</span>
        </li>
        <li>
          <span>결제수단: </span>
          <span>KG이니시스</span>
        </li>
        <li>
          <span>결제금액: </span>
          <span>{amount}</span>
        </li>
        <li>
          <span>이름: </span>
          <span>{buyer_name}</span>
        </li>
        <li>
          <span>전화번호: </span>
          <span>{buyer_tel}</span>
        </li>
        <li>
          <span>이메일: </span>
          <span>{buyer_email}</span>
        </li>
        <li>
          <span>주소: </span>
          <span>{buyer_addr}</span>
        </li>
        <li>
          <span>상세주소: </span>
          <span>{buyer_detailaddr}</span>
        </li>
        <li>
          <span>우편번호: </span>
          <span>{buyer_postcode}</span>
        </li>
      </ul>
      <div className="flex flex-col">
        <button onClick={redirectToMain}>메인페이지로 돌아가기</button>
        <button onClick={redirectToOrderList}>주문내역 확인하기</button>
      </div>
    </div>
  );
};

export default PaymentResult;
