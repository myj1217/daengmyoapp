import { useEffect, useState } from "react";
import { getOne } from "../../api/productApi";
import { replyDel, replyList } from "../../api/productReplyApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
// import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import ReviewAddComponent from "./ReviewAddComponent";
import ReviewItemComponent from "./ReviewItemComponent";

const iniState = {
  prno: 0,
  pno: 0,
  productReplyText: "",
  productReplyer: "",
  regDate: "",
};

const ReviewListComponent = ({ pno }) => {
  const [review, setReview] = useState(iniState);
  //   const { page, size, moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  //   const { changeCart, cartItems } = useCustomCart();
  const { isLogin, loginState } = useCustomLogin();
  const navigate = useNavigate();
  const [reviewModal, setReviewModal] = useState(false); // 모달 상태 추가
  const [reviewListener, setReviewListener] = useState(false);

  // 리뷰 작성하기 핸들러
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

  // 리뷰창 닫기 핸들러
  const handleCloseModal = () => {
    console.log("handleCloseModal");
    setReviewModal(false); // 모달 닫기;
  };

  // 리뷰 완료 후 상품정보창으로 리다이렉트 핸들러
  const reviewRedirect = () => {
    console.log("setReviewListener true");
    setReviewListener(true);
  };

  useEffect(() => {
    setFetching(true);
    setReviewListener(false);

    // 상품 리뷰
    replyList(pno).then((data) => {
      console.log(data);
      setReview(data);
      setFetching(false);
    });
  }, [pno, reviewListener]);

  return (
    <div className="w-full border-2 border-gray-300 mt-4 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="my-10 text-5xl">상품리뷰</div>

      <button
        type="button"
        className="inline-block rounded p-4 m-2 w-full bg-gray-800 hover:bg-gray-600 text-white"
        onClick={reviewHandler}
      >
        리뷰 작성하기
      </button>

      <div
        id="review zone"
        className="w-full border-2 border-gray-300 mt-4 m-2 p-4"
      >
        <div id="review title">
          {" "}
          <div className="flex text-lg p-4 justify-between">
            <div className="w-1/6 text-center p-1">작성자</div>
            <div className="w-3/6 text-center p-1">내용</div>
            <div className="w-1/6 text-center p-1">등록시간</div>
            <div className="w-1/6 text-center p-1">삭제</div>
          </div>
        </div>

        {review.dtoList ? (
          <div id="review list">
            <ul>
              {review.dtoList.map((item) => (
                <ReviewItemComponent
                  {...item}
                  key={item.prno}
                  reviewRedirect={reviewRedirect}
                  pno={pno}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div>리뷰를 불러올 수 없습니다.</div>
        )}

        {/* <div className="flex flex-col">
          {review.dtoList ? (
            review.dtoList.map((item) => (
              <div
                key={item.prno}
                className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex text-lg p-4 justify-between">
                  <div className="w-1/6 text-center p-1">
                    {item.productReplyer}
                  </div>
                  <div className="w-3/6 text-center p-1">
                    {item.productReplyText}
                  </div>
                  <div className="w-1/6 text-center p-1">{item.regDate}</div>
                  <div className="w-1/6 text-center p-1">
                    <button
                      className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
                      onClick={reviewDeleteHandler}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews available</div>
          )}
        </div> */}

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
                <div id="comp modal">
                  <ReviewAddComponent
                    handleCloseModal={handleCloseModal}
                    pno={pno}
                    reviewRedirect={reviewRedirect}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListComponent;
