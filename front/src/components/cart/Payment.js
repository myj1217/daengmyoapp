import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Payment({ totalPrice, closeModal, redirectToCart }) {
  const [buyerInfo, setBuyerInfo] = useState({
    email: "",
    name: "",
    number: "",
    streetAddress: "",
    detailAddress: "",
    zipCode: "",
  });

  const buyerState = useSelector((state) => state.loginSlice);

  useEffect(() => {
    setBuyerInfo({ ...buyerState });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const ClickChargeBtn = (pg_method) => {
    const { IMP } = window;
    IMP.init("imp23143410");
    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: "테스트 상품",
        amount: 100,
        buyer_email: buyerInfo.email,
        buyer_name: buyerInfo.name,
        buyer_tel: buyerInfo.tel,
        buyer_postcode: buyerInfo.postcode,
        buyer_addr: buyerInfo.address,
        m_redirect_url: "http://localhost:3000/cart",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          alert("결제 성공");
          closeModal(); // 결제 성공 시 모달을 닫습니다.
        } else {
          alert("결제 실패");
          console.log(rsp);
        }
      }
    );
  };

  return (
    <div className="Payment">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "2px dotted #000", // 점선 스타일 적용
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            marginBottom: "20px",
          }}
        >
          결제 정보
        </h1>
      </div>
      <div className="form-box">
        <div className="payment-info" style={{ marginTop: "40px" }}>
          <div className="form-group" style={{ margin: "15px" }}>
            <label htmlFor="email">이메일 : </label>
            <input
              type="text"
              id="email"
              name="email"
              value={buyerInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ margin: "15px" }}>
            <label htmlFor="name">이름 : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={buyerInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ margin: "15px" }}>
            <label htmlFor="tel">전화번호 : </label>
            <input
              type="text"
              id="tel"
              name="tel"
              value={buyerInfo.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ margin: "15px" }}>
            <label htmlFor="address" className="flex">
              주소 :{" "}
            </label>
            <textarea
              style={{ resize: "none" }}
              rows={3}
              type="text"
              id="address"
              name="address"
              value={buyerInfo.streetAddress + " " + buyerInfo.detailAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group" style={{ margin: "15px" }}>
            <label htmlFor="postcode">우편번호 : </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={buyerInfo.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div
          className="payment-summary"
          style={{
            borderTop: "2px dotted #000", // 점선 스타일 적용
            marginTop: "50px",
            // marginLeft: "15px",
            fontSize: "25px",
            marginBottom: "20px", // 요소 아래쪽에 여백 추가
          }}
        >
          <p
            style={{
              marginTop: "10px",
              textAlign: "right",
              marginRight: "20px",
            }}
          >
            총 금액 : {totalPrice.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>
      <div
        className="payment-actions"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <button
          onClick={ClickChargeBtn}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "7px 15px",
            marginRight: "15px",
          }}
        >
          결제하기
        </button>
        <div style={{ width: "20px", display: "inline-block" }}></div>{" "}
        {/* 여백을 추가하는 div 요소 */}{" "}
        <button
          onClick={redirectToCart}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "7px 15px",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
export default Payment;
