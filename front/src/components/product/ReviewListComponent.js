import { useEffect, useState } from "react";
import { replyList } from "../../api/productReplyApi";
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
  // const [fetching, setFetching] = useState(false);
  const { isLogin, loginState, exceptionHandle } = useCustomLogin();
  const navigate = useNavigate();
  const [reviewAddModal, setReviewAddModal] = useState(false); // 모달 상태 추가
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
    setReviewAddModal(true); // 모달 열기
  };

  // 리뷰창 닫기 핸들러
  const closeAddReview = () => {
    setReviewAddModal(false); // 모달 닫기;
  };

  // 리뷰 완료 후 상품정보창으로 리다이렉트 핸들러
  const reviewRedirect = () => {
    setReviewListener(!reviewListener);
  };

  useEffect(() => {
    // 상품 리뷰
    replyList(pno)
      .then((data) => {
        setReview(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [reviewListener]);

  return (
    <div className="w-full border-2 border-gray-300 mt-4 m-2 p-4">
      {/* {fetching ? <FetchingModal /> : <></>} */}

      {review.dtoList && review.dtoList.length > 0 ? (
        <div className="my-10 text-4xl">상품리뷰({review.dtoList.length})</div>
      ) : (
        <div className="my-10 text-4xl">상품리뷰(0)</div>
      )}

      <div className="flex justify-start">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 bg-emerald-500 hover:bg-emerald-700 text-white"
          onClick={reviewHandler}
        >
          리뷰 작성하기
        </button>
      </div>

      <div
        id="review zone"
        // className="w-full border-2 border-gray-300 mt-4 m-2 p-4"
        className="w-full mt-4 m-2 p-4"
      >
        {/* 리뷰 타이틀 */}
        <div id="review title" className="border-b border-gray-300">
          <div className="flex text-sm font-bold p-4 justify-between">
            <div className="w-2/12 text-center p-1">별점</div>
            <div className="w-5/12 text-center p-1">내용</div>
            <div className="w-2/12 text-center p-1">작성자</div>
            <div className="w-2/12 text-center p-1">등록시간</div>
            <div className="w-1/12 text-center p-1">{""}</div>
          </div>
        </div>

        {/* 리뷰 목록 */}
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

        {/* reviewAdd 모달 */}
        {reviewAddModal && (
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-y-auto bg-black bg-opacity-80"
            style={{ zIndex: 9999 }}
          >
            <div
              className="bg-white p-8 rounded-lg"
              style={{ width: "300px", height: "300px", zIndex: 9999999 }}
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
                    closeAddReview={closeAddReview}
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
