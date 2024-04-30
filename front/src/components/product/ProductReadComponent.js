import { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import useCustomProduct from "../../hooks/useCustomProduct";

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
  const [fetching, setFetching] = useState(false);
  const { changeCart, cartItems } = useCustomCart();
  const { isLogin, loginState, isAdmin } = useCustomLogin();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0); // 총 금액
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { updateOrderAmount } = useCustomProduct();

  // 장바구니 담기 핸들러
  const handleClickAddCart = () => {
    if (!isLogin) {
      if (
        window.confirm(
          "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        ) === false
      ) {
        return;
      }
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
    if (!isLogin) {
      if (
        window.confirm(
          "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        ) === false
      ) {
        return;
      }
      navigate("/member/login");
    } else {
      // totalPrice 전역으로 저장
      updateOrderAmount(totalPrice);

      // 주문 페이지로 이동
      navigate("../order");
    }
  };

  // 목록으로 돌아가기 핸들러
  const clickListHandler = () => {
    navigate("/products/list");
  };

  // 상품정보 수정하기 핸들러 (관리자만)
  const clickModifyHandler = () => {
    if (!isAdmin) {
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
    <div className="p-4">
      <div className="w-full border-2 border-gray-300">
        {fetching ? <FetchingModal /> : <></>}
        <div id="product_zone" className="flex w-full">
          <div
            id="product_image_zone"
            className="flex flex-col w-1/2 m-2 justify-center items-center"
          >
            <img
              className="object-cover
              h-52 sm:h-64 md:h-80 lg:h-96
              w-52 sm:w-64 md:w-80 lg:w-96"
              src={`${host}/api/products/view/${product.uploadFileNames[selectedImageIndex]}`}
              alt="selected product"
            />
            <div id="product_image_list_zone" className="flex flex-row m-2">
              {product.uploadFileNames.map((imgFile, i) => (
                <img
                  alt="product"
                  key={i}
                  className="w-24 h-24 mx-1 object-cover hover:border hover:border-gray-300 cursor-pointer"
                  src={`${host}/api/products/view/${imgFile}`}
                  onClick={() => setSelectedImageIndex(i)}
                />
              ))}
            </div>
          </div>

          <div id="product_text_zone" className="w-1/2 p-4">
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

            <div className="flex justify-between w-full p-4 m-2 text-lg text-red-500 border-b-2 border-red-500">
              <div className="">상품금액 합계</div>
              <div>{totalPrice.toLocaleString("ko-KR")}원</div>
            </div>

            <div
              id="product_read_buttons"
              className="grid grid-cols-1 lg:grid-cols-2 gap-1 text-white"
            >
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-emerald-500 hover:bg-emerald-700"
                onClick={directOrder}
              >
                바로 주문하기
              </button>
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full text-emerald-500 hover:text-white hover:bg-emerald-700 border border-emerald-500"
                onClick={handleClickAddCart}
              >
                장바구니에 담기
              </button>
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-emerald-500 hover:bg-emerald-700"
                onClick={clickListHandler}
              >
                목록으로 돌아가기
              </button>
              {isAdmin ? (
                <button
                  type="button"
                  className="inline-block rounded p-4 m-2 w-full bg-red-500 hover:bg-red-700"
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
    </div>
  );
};

export default ProductReadComponent;
