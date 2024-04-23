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
}) => {
  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <p>주문 완료</p>
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
          <span>우편번호: </span>
          <span>{buyer_postcode}</span>
        </li>
      </ul>
      <button onClick={redirectToMain}>돌아가기</button>
    </div>
  );
};

export default PaymentResult;
