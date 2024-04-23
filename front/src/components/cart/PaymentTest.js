import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import PaymentResult from "./PaymentResult";
import FetchingModal from "../common/FetchingModal";

const PaymentTest = ({ totalPrice, clearCart }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const user = useSelector((state) => state.loginSlice);
  const [fetching, setFetching] = useState(false);

  // 결제 데이터 정의
  const info = {
    pg: "html5_inicis.INIpayTest",
    // pg: "html5_inicis", // PG사 html5_inicis.INIpayTest
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    name: "댕묘앞", // 주문명
    amount: 100, // 결제금액
    //   amount: totalPrice, // 결제금액
    buyer_name: user.name, // 구매자 이름
    buyer_tel: user.tel, // 구매자 전화번호, 필수 파라미터
    buyer_email: user.email, // 구매자 이메일
    buyer_addr: user.address, // 구매자 주소
    buyer_postcode: user.postcode, // 구매자 우편번호
  };

  // 결제 창 호출
  const onClickPayment = () => {
    if (totalPrice === 0) {
      window.alert("주문할 상품을 선택해주세요.");
      return;
    }

    const userCode = "imp57275300"; // 가맹점 식별 코드

    const { IMP } = window;
    IMP.init(userCode);
    IMP.request_pay(info, callback);
    setFetching(true);
  };

  const callback = (response) => {
    const { success, error_msg } = response;
    setFetching(false);

    if (success) {
      window.alert("결제 성공");
      setPaymentSuccess(true);
      clearCart();
    } else {
      window.alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <div>
      {fetching ? <FetchingModal /> : <></>}
      {paymentSuccess && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-y-auto bg-black bg-opacity-80"
          style={{ zIndex: 9999 }}
        >
          <div
            className="bg-white p-8 rounded-lg"
            style={{ width: "400px", height: "400px", zIndex: 9999999 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div id="comp modal">
                <PaymentResult
                  merchant_uid={info.merchant_uid}
                  amount={info.amount}
                  buyer_name={info.buyer_name}
                  buyer_tel={info.buyer_tel}
                  buyer_email={info.buyer_email}
                  buyer_addr={info.buyer_addr}
                  buyer_postcode={info.buyer_postcode}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onClickPayment}
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
          style={{
            width: "200px",
            height: "35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          선택 상품 주문하기
        </button>
      </div>
    </div>
  );
};

export default PaymentTest;
