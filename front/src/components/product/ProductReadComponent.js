import { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/rootApi";
// import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ProductReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  // const { page, size, moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const { changeCart, cartItems } = useCustomCart();
  const { isLogin, loginState } = useCustomLogin();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0); // 총 금액
  const [quantity, setQuantity] = useState(1);

  // 장바구니 담기 핸들러
  const handleClickAddCart = () => {
    if (!isLogin) {
      window.alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
      navigate("/member/login");
    } else {
      let qty = 1;

      const addedItem = cartItems.filter(
        (item) => item.pno === parseInt(pno)
      )[0];

      if (addedItem) {
        if (
          window.confirm(
            "장바구니에 이미 추가된 상품입니다. 추가하시겠습니까? "
          ) === false
        ) {
          return;
        }
        qty = addedItem.qty + 1;
      }

      changeCart({ email: loginState.email, pno: pno, qty: qty });
      window.alert("장바구니에 성공적으로 추가되었습니다.");
    }
  };

  // 바로 주문하기 핸들러
  const directOrder = () => {
    navigate(`../order/${totalPrice}`);
  };

  // 목록으로 돌아가기 핸들러
  const clickListHandler = () => {
    navigate("/products/list");
  };

  const clickModifyHandler = () => {
    if (loginState.email !== product.email) {
      window.alert("수정권한이 없습니다.");
      return;
    }
    navigate(`/products/modify/${pno}`);
  };

  const redQty = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
    setTotalPrice(product.price * quantity);
  };

  const incQty = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice(product.price * quantity);
  };

  useEffect(() => {
    setFetching(true);

    // 상품 정보
    getOne(pno).then((data) => {
      setProduct(data);
      setTotalPrice(data.price);
      setFetching(false);
    });
  }, [pno]);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity]);

  return (
    <>
      <div className="w-full border-2 border-gray-300 mt-4 m-2 p-4">
        {fetching ? <FetchingModal /> : <></>}
        <div id="product_zone" className="flex">
          <div
            id="product_image_zone"
            // className="w-1/2 justify-center flex  flex-col m-auto items-center"
            className="w-1/2"
          >
            {product.uploadFileNames.map((imgFile, i) => (
              <img
                alt="product"
                key={i}
                className="w-full object-cover"
                src={`${host}/api/products/view/${imgFile}`}
              />
            ))}
          </div>
          <div id="product_text_zone" className="w-1/2">
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-full p-4 text-3xl">{product.pname}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-full p-4 text-xl">
                  {product.price.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-full p-4 text-lg">{product.pdesc}</div>
              </div>
            </div>

            <div className="flex justify-between w-full p-4 m-2">
              <div>구매수량</div>
              <div id="qty_button_zone">
                <button className="bg-white rounded-lg mr-2" onClick={redQty}>
                  <FaMinusCircle />
                </button>
                {quantity}
                <button className="bg-white rounded-lg ml-2" onClick={incQty}>
                  <FaPlusCircle />
                </button>
              </div>
            </div>

            <div className="flex justify-between w-full p-4 m-2 text-lg text-red-500">
              <div className="">상품금액 합계</div>
              <div>{totalPrice.toLocaleString("ko-KR")}원</div>
            </div>

            <div
              id="product_read_buttons"
              // className="flex-col justify-center p-4 text-sm text-white"
              className="grid grid-cols-1 lg:grid-cols-2 gap-1 text-white"
            >
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-green-300 hover:bg-green-500"
                onClick={handleClickAddCart}
              >
                장바구니에 담기
              </button>
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-green-300 hover:bg-green-500"
                onClick={directOrder}
              >
                바로 주문하기
              </button>
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-green-300 hover:bg-green-500"
                onClick={clickListHandler}
              >
                목록으로 돌아가기
              </button>
              {loginState.email === product.email ? (
                <button
                  type="button"
                  className="inline-block rounded p-4 m-2 w-full bg-red-300 hover:bg-red-500"
                  onClick={clickModifyHandler}
                >
                  상품정보 수정
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReadComponent;
