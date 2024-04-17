import { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { replyList } from "../../api/productReplyApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import ReviewAddComponent from "../product/ReviewAddComponent";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const iniState = {
  prno: 0,
  pno: 0,
  productReplyText: "",
  productReplyer: "",
  regDate: "",
};

const host = API_SERVER_HOST;

const ProductReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [review, setReview] = useState(iniState);
  const { page, size, moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const { changeCart, cartItems } = useCustomCart();
  const { isLogin, loginState } = useCustomLogin();
  const navigate = useNavigate();
  const [reviewModal, setReviewModal] = useState(false); // 모달 상태 추가

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

  // 목록으로 돌아가기 핸들러
  const handleClickList = () => {
    navigate("/products/list");
  };

  const reviewHandler = () => {
    if (!isLogin) {
      if (
        window.confirm(
          "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        ) === false
      ) {
        return;
      }
      navigate("/member/login");
    }
    setReviewModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setReviewModal(false); // 모달 닫기;
  };

  useEffect(() => {
    setFetching(true);

    // 상품 정보
    getOne(pno).then((data) => {
      setProduct(data);
      console.log(data);
      setFetching(false);
    });

    // 상품 리뷰
    replyList(pno, { page, size }).then((data) => {
      console.log(data);
      setReview(data);
      setFetching(false);
    });
  }, [pno]);

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
              {isLogin ? (
                <button
                  type="button"
                  className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600"
                  onClick={() => moveToModify(pno)}
                >
                  상품정보 수정
                </button>
              ) : (
                <></>
              )}
              <button
                type="button"
                className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600"
                onClick={handleClickList}
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="review zone"
        className="w-full border-2 border-gray-300 mt-4 m-2 p-4"
      >
        <div className="flex flex-col">
          {review.dtoList ? (
            review.dtoList.map((product) => (
              <div
                key={product.prno}
                className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex text-lg p-4 justify-between">
                  <div className="w-1/4 text-center p-1">
                    {product.productReplyer}
                  </div>
                  <div className="w-2/4 text-center p-1">
                    {product.productReplyText}
                  </div>
                  <div className="w-1/4 text-center p-1">{product.regDate}</div>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600 text-white"
          onClick={reviewHandler}
        >
          리뷰 작성하기
        </button>
        {reviewModal && ( // 모달 표시 조건 추가
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
                {/* <div id="anc modal">
                <h1>리뷰모달입니다.</h1>
                <div id="review writting zone"></div>
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
                  작성완료
                </button>
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
                </div> */}
                <div id="comp modal">
                  <ReviewAddComponent
                    handleCloseModal={handleCloseModal}
                    pno={pno}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReadComponent;
