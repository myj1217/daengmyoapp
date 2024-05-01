import React, { useState } from "react";
import { useSelector } from "react-redux";
import PaymentResult from "../payment/PaymentResult";
import FetchingModal from "../common/FetchingModal";
import { orderAdd } from "../../api/orderApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomProduct from "../../hooks/useCustomProduct";

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
  orderStatus: "결제 실패",
  deliveryRequest: "",
};

const OrderComponent = () => {

  const user = useSelector((state) => state.loginSlice);

  const [payment, setPayment] = useState({
    ...iniState,
    buyerAddress: user.streetAddress || "", // 주소 정보는 사용자 정보에서 가져오되, 없을 경우 빈 문자열로 초기화
    buyerAddressCode: user.addressCode || "", // 우편번호 정보는 사용자 정보에서 가져오되, 없을 경우 0으로 초기화
    buyerDetailAddress: user.detailAddress || "", // 상세 주소는 초기에 비워둠
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [fetching, setFetching] = useState(false);

  const { updateCheckList } = useCustomProduct(); // 총 금액 넘기기
  const totalPrice = useSelector(
    (state) => state.productSlice?.totalOrderAmount
  );
  const checkList = useSelector((state) => state.productSlice?.checked);

  const { loginState } = useCustomLogin();
  const { cartItems, changeCart } = useCustomCart();

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
    buyer_tel: user.number, // 구매자 전화번호, 필수 파라미터
    buyer_email: user.email, // 구매자 이메일
    buyer_addr: user.address, // 구매자 주소
    buyer_postcode: user.postcode, // 구매자 우편번호
  };

  const handleChange = (e) => {
    payment[e.target.name] = e.target.value;
    setPayment({ ...payment });
  };

  // 주문정보 저장 핸들러
  const orderSaveHandler = () => {
    const formData = new FormData();

    formData.append("userId", user.email);
    formData.append("impUid", info.merchant_uid);
    formData.append("orderName", info.name);
    formData.append("totalPrice", totalPrice);
    formData.append("buyerName", user.name);
    formData.append("buyerTel", user.number);
    formData.append("buyerEmail", user.email);
    formData.append("buyerAddress", payment.buyerAddress);
    formData.append("buyerAddressCode", payment.buyerAddressCode);
    formData.append("buyerDetailAddress", payment.buyerDetailAddress);
    formData.append("orderStatus", "결제 성공");
    formData.append("deliveryRequest", payment.deliveryRequest);

    setFetching(true);

    orderAdd(formData)
      .then((data) => {})
      .catch((error) => {
        console.error("주문내역 저장 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    console.log("주문정보가 성공적으로 저장되었습니다.");
  };

  // 카카오 주소찾기 API 불러오기
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let code = data.zonecode;
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setPayment({
          ...payment,
          buyerAddress: fullAddress,
          buyerAddressCode: code,
        });
      },
    }).open();
  };

  // 결제 성공 시 선택한 장바구니 항목 비우기
  const clearCart = () => {
    cartItems.forEach((item) => {
      if (checkList.includes(item.cino)) {
        return changeCart({
          email: loginState.email,
          cino: item.cino,
          pno: item.pno,
          qty: 0,
        });
      }
      return item;
    });

    // 장바구니 선택 항목을 전역으로 담고있던 내용 초기화
    updateCheckList([]);
  };

  // 결제 창 호출
  const onClickPayment = () => {
    // 배송지 주소를 입력하지 않았을 경우 return
    if (!payment.buyerAddress) {
      window.alert("배송지 주소를 입력해주세요.");
      return;
    }

    // 배송 요청사항을 선택하지 않았을 경우 return
    if (!payment.deliveryRequest) {
      window.alert("배송 요청사항을 선택해주세요.");
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
      clearCart();
      orderSaveHandler();
      setPaymentSuccess(true);
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
                  buyer_addr={payment.buyerAddress}
                  buyer_postcode={payment.buyerAddressCode}
                  buyer_detailaddr={payment.buyerDetailAddress}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <>
        <div className="my-10 ml-6 text-5xl">주문정보</div>
        <div>
          <div>
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">주문자</div>
                <div className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-200">
                  {user.name}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">연락처</div>
                <div className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-200">
                  {user.number}
                </div>
              </div>
            </div>
            {payment.buyerAddressCode ? (
              <>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                      우편번호
                    </div>
                    <div className="w-1/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-200">
                      {payment.buyerAddressCode}
                    </div>
                    <div
                      onClick={openPostcode}
                      className="ml-2 p-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold rounded-md cursor-pointer"
                    >
                      주소 찾기
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                      배송지 주소
                    </div>
                    <div className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-200">
                      {payment.buyerAddress}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                      상세주소
                    </div>
                    <input
                      className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                      name="buyerDetailAddress"
                      type={"text"}
                      value={payment.buyerDetailAddress}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                      우편번호
                    </div>
                    <div
                      onClick={openPostcode}
                      className="w-1/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md cursor-pointer"
                      onChange={handleChange}
                    
                    ></div>
                    <div
                      onClick={openPostcode}
                      className="ml-2 p-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold rounded-md cursor-pointer"
                    >
                      주소 찾기
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div
                      onClick={openPostcode}
                      className="w-1/5 p-6 text-right font-bold"
                      onChange={handleChange}
                    >
                      배송지 주소
                    </div>
                    <div className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md cursor-pointer">
                      {payment.buyerAddress}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">
                      상세주소
                    </div>
                    <input
                      className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                      name="buyerDetailAddress"
                      type={"text"}
                      value={payment.buyerDetailAddress}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">결제 금액</div>
                <div className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md bg-gray-200">
                  {totalPrice.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">
                  배송 요청사항
                </div>
                <select
                  className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md cursor-pointer"
                  name="deliveryRequest"
                  value={payment.deliveryRequest}
                  onChange={handleChange}
                >
                  <option value="">요청사항을 선택하세요</option>
                  <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                  <option value="부재 시 연락 부탁드려요">
                    부재 시 연락 부탁드려요
                  </option>
                  <option value="배송 전 미리 연락해 주세요">
                    배송 전 미리 연락해 주세요
                  </option>
                  <option value="요청사항 없음">요청사항 없음</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <button
            onClick={onClickPayment}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4"
            style={{
              width: "200px",
              height: "35px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            결제하기
          </button>
        </div>
      </>
    </div>
  );
};

export default OrderComponent;
