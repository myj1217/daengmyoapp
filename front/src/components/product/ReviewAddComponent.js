import { useState } from "react";
// import { useRef, useState } from "react";
import { replyAdd } from "../../api/productReplyApi";
import FetchingModal from "../common/FetchingModal";
// import ResultModal from "../common/ResultModal";
// import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

const initState = {
  prno: 0,
  pno: 0,
  productReplyText: "",
  productReplyer: "",
  regDate: "",
  star: 1,
};

const ReviewAddComponent = ({ handleCloseModal, pno, reviewRedirect }) => {
  const loginState = useSelector((state) => state.loginSlice);
  const [review, setReview] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const [rating, setRating] = useState(3);
  // const { moveToList } = useCustomMove();
  // const navigate = useNavigate();

  // 작성한 내용 반응
  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  // 추가 버튼 클릭 시 작동
  const handleClickAdd = (e) => {
    const formData = new FormData();

    // 입력받은 데이터
    formData.append("pno", pno);
    formData.append("productReplyText", review.productReplyText);
    formData.append("productReplyer", loginState.nickname);
    formData.append("star", review.star);

    setFetching(true);

    replyAdd(formData)
      .then((data) => {
        reviewRedirect();
      })
      .catch((error) => {
        console.error("리뷰 등록 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("리뷰가 성공적으로 등록되었습니다.");

    handleCloseModal();
  };

  const starHandler = (value) => {
    setRating(value);
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {/* {result ? (
        <ResultModal
          title={"리뷰 등록"}
          // content={`${result}번째 상품으로 등록되었습니다!`}
          content={"성공적으로 리뷰가 등록되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )} */}
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            name="star"
            key={value}
            onClick={() => starHandler(value)}
            onChange={handleChangeReview}
            style={{
              cursor: "pointer",
              color: value <= rating ? "gold" : "gray",
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="productReplyer"
            type={"text"}
            value={loginState.nickname}
            onChange={handleChangeReview}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="productReplyText"
            rows="4"
            onChange={handleChangeReview}
            value={review.productReplyText}
          >
            {review.productReplyText}
          </textarea>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-gray-800 text-xl  text-white "
            onClick={handleClickAdd}
          >
            추가하기
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-gray-800 text-xl  text-white "
            onClick={handleCloseModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAddComponent;
