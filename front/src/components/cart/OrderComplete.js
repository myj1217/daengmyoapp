import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OrderComplete({ totalPrice, closeModal }) {
  const [orderInfo, setOrderInfo] = useState({
    email: "",
    name: "",
    number: "",
    streetAddress: "",
    detailAddress: "",
    zipCode: "",
  });

  const orderState = useSelector((state) => state.loginSlice);

  useEffect(() => {
    setOrderInfo({ ...orderState });
  }, []);

  return (
    <div className="order-complete">
      <div
        className="bg-white p-8 rounded-lg"
        style={{
          width: "530px",
          height: "600px",
          zIndex: 9999999,
          border: "1px solid #ccc",
        }}
      >
        <div className="form-box">
          <div className="order-info" style={{ marginTop: "40px" }}>
            <div className="form-group" style={{ margin: "15px" }}>
              <label htmlFor="email">이메일 : </label>
              <input
                type="text"
                id="email"
                name="email"
                value={orderInfo.email}
                readOnly
              />
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label htmlFor="name">이름 : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={orderInfo.name}
                readOnly
              />
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label htmlFor="tel">전화번호 : </label>
              <input
                type="text"
                id="tel"
                name="tel"
                value={orderInfo.number}
                readOnly
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
                value={orderInfo.streetAddress + " " + orderInfo.detailAddress}
                readOnly
              />
            </div>
            <div className="form-group" style={{ margin: "15px" }}>
              <label htmlFor="postcode">우편번호 : </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={orderInfo.zipCode}
                readOnly
              />
            </div>
          </div>
          <div
            className="order-summary"
            style={{
              borderTop: "2px dotted #000",
              marginTop: "50px",
              fontSize: "25px",
              marginBottom: "20px",
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
      </div>
    </div>
  );
}
export default OrderComplete;
