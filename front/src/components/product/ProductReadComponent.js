import { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

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
  //화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();
  //fetching
  const [fetching, setFetching] = useState(false);
  // 장바구니 기능
  const { changeCart, cartItems } = useCustomCart();
  // 로그인 정보
  const { loginState } = useCustomLogin();

  // 장바구니 담기 핸들러
  const handleClickAddCart = () => {
    let qty = 1;

    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];

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
  };

  useEffect(() => {
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  return (
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
          <div
            id="product_read_buttons"
            className="flex-col justify-center p-4 text-sm text-white"
          >
            <button
              type="button"
              className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600"
              onClick={handleClickAddCart}
            >
              장바구니에 담기
            </button>
            <button
              type="button"
              className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600"
              onClick={() => moveToModify(pno)}
            >
              상품정보 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReadComponent;
