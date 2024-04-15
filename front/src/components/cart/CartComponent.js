import { useEffect, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "./CartItemComponent";
import Payment from "./Payment";
import OrderComplete from "./OrderComplete";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart();
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showNewModal, setShowNewModal] = useState(false); // 새 모달 상태 추가
  const [checkList, setCheckList] = useState([]); // 체크 여부
  const [selectedQty, setSelectedQty] = useState(0); // 선택 물품 수량
  const [selectedPrice, setSelectedPrice] = useState(0); // 선택 물품 총 금액
  // const navigate = useNavigate();

  // 개별 체크박스 핸들러
  const changeSingleBox = (checked, id) => {
    if (checked) {
      setCheckList([...checkList, id]);
      console.log("check on - " + checkList);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
      console.log("check off - " + checkList);
    }
  };

  // 전체 체크박스 핸들러
  const changeAllBox = (checked) => {
    if (checked) {
      const allCheckBox = [];
      cartItems.forEach((item) => allCheckBox.push(item.cino));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };

  // 주문완료 후 장바구니 비우기
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
  };

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  useEffect(() => {
    if (!Array.isArray(cartItems)) {
      return; // cartItems가 배열이 아니면 처리 중단
    }

    // 선택된 장바구니 항목의 총 개수
    const selectedQty = cartItems.reduce((acc, curr) => {
      if (checkList.includes(curr.cino)) {
        return acc + curr.qty;
      } else {
        return acc;
      }
    }, 0);

    // 선택된 장바구니 항목의 총 금액
    const selectedPrice = cartItems.reduce((acc, curr) => {
      if (checkList.includes(curr.cino)) {
        return acc + curr.price * curr.qty;
      } else {
        return acc;
      }
    }, 0);

    setSelectedQty(selectedQty);
    setSelectedPrice(selectedPrice);
  }, [cartItems, checkList]);

  // ********* 모달 *********

  // 선택상품 주문하기 모달
  const handleCheckout = () => {
    // 선택한 상품의 개수가 0인 경우에는 아무 작업도 수행하지 않음
    if (selectedQty === 0) {
      window.alert("주문할 상품을 선택해주세요.");
      return;
    }
    setShowModal(true); // 모달 열기
  };

  // 주문정보 모달 닫은 후
  const closeModalAndOpenNewModal = () => {
    setShowModal(false); // 기존 모달 닫기
    // 새로운 모달을 열기 위해 showModal 상태를 true로 업데이트
    setShowNewModal(true);
  };

  const handleCloseModal = () => {
    setShowNewModal(false); // 새 모달 닫기
    clearCart(); // 장바구니 비우기
    return <Navigate to="/" />;
  };

  const redirectToCart = () => {
    setShowModal(false); // 기존 모달 닫기
  };

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            {/* <div className="font-extrabold text-2xl w-4/5">장바구니</div> */}
            <div className="bg-gray-800 text-center text-white font-bold w-1/6 rounded-full py-1">
              상품 종류: {cartItems.length}개
            </div>
          </div>

          <div className="mt-8 border-y py-3 border-gray-300">
            <ul className="flex justify-evenly text-base text-center">
              <li className="w-1/12">
                {/* 전체 체크박스 */}
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-gray-700"
                  onChange={(event) => changeAllBox(event.target.checked)}
                  checked={checkList.length === cartItems.length ? true : false}
                />
              </li>
              <li className="w-2/12">이미지</li>
              <li className="w-2/12">상품명</li>
              <li className="w-2/12">판매가</li>
              <li className="w-2/12">수량</li>
              <li className="w-2/12">주문금액</li>
              <li className="w-1/12">삭제</li>
            </ul>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                  changeSingleBox={changeSingleBox}
                  checkList={checkList}
                />
              ))}
            </ul>
          </div>
          {/* 전체 수량과 전체 금액 표시 */}
          <div className="flex justify-between border-b border-gray-300">
            <div className="flex w-1/12 justify-center items-center">
              <button
                onClick={clearCart}
                className="h-1/2 bg-gray-700 hover:bg-gray-900 text-white text-xs font-bold px-2 rounded"
                // style={{
                //   width: "100px",
                //   height: "35px",
                //   display: "flex",
                //   flexDirection: "column",
                //   justifyContent: "center",
                //   alignItems: "center",
                // }}
              >
                선택 삭제
              </button>
            </div>
            <div
              className="flex justify-between items-center my-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ marginRight: "30px", fontSize: "18px" }}>
                총 수량 : {selectedQty.toLocaleString("ko-KR")}개
              </div>
              <div style={{ marginRight: "30px", fontSize: "18px" }}>
                총 결제금액 : {selectedPrice.toLocaleString("ko-KR")}원
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleCheckout}
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
          {showModal && ( // 모달 표시 조건 추가
            <div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-y-auto bg-black bg-opacity-80"
              style={{ zIndex: 9999 }}
            >
              <div
                className="bg-white p-8 rounded-lg"
                style={{ width: "400px", height: "600px", zIndex: 9999999 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Payment
                    totalPrice={selectedPrice}
                    closeModal={closeModalAndOpenNewModal}
                    redirectToCart={redirectToCart}
                  />{" "}
                  {/* Payment 컴포넌트 렌더링 */}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {showNewModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-y-auto bg-black bg-opacity-80"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-pink-100 p-4 rounded-lg">
            <div
              className="bg-white p-8 rounded-lg"
              style={{
                width: "600px",
                height: "800px",
                zIndex: 9999999,
                border: "1px solid #ccc", // 회색 테두리 추가
              }}
            >
              <div className="text-center font-bold text-xl mb-4">
                <h1
                  style={{
                    fontSize: "40px",
                    marginBottom: "30px",
                  }}
                >
                  주문 내역 확인
                </h1>
              </div>
              <OrderComplete
                totalPrice={selectedPrice}
                closeModal={closeModalAndOpenNewModal}
              />
              <Link to={"/"}>
                <button
                  onClick={handleCloseModal}
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
                  닫기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
