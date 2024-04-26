import { useState } from "react";
import { replyAdd } from "../../api/productReplyApi";
import FetchingModal from "../common/FetchingModal";
import { useSelector } from "react-redux";

const initState = {
  prno: 0,
  pno: 0,
  productReplyText: "",
  productReplyer: "",
  regDate: "",
  star: 1,
};

const ReviewAddComponent = ({ closeAddReview, pno, reviewRedirect }) => {
  const loginState = useSelector((state) => state.loginSlice);
  const [review, setReview] = useState({ ...initState });
  const [fetching, setFetching] = useState(false);
  const [star, setStar] = useState(3);

  // 리뷰 작성한 내용 반응 핸들러
  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  // 별점 핸들러
  const starHandler = (value) => {
    setStar(value);
  };

  // 추가 버튼 클릭 시 작동
  const handleClickAdd = (e) => {
    const formData = new FormData();

    // 입력받은 데이터
    formData.append("pno", pno);
    formData.append("productReplyText", review.productReplyText);
    formData.append("productReplyer", loginState.nickname);
    formData.append("star", star);
    formData.append("email", loginState.email);

    if (!review.productReplyText) {
      window.alert("내용을 입력해주세요.");
      return;
    }

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

    closeAddReview();
  };

  return (
    <div className="border-2 border-gray-300 p-2 text-sm">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex mb-4 w-full items-center">
        <div className="w-1/5 font-bold text-center">별점</div>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              name="star"
              key={value}
              onClick={() => starHandler(value)}
              onChange={handleChangeReview}
              style={{
                cursor: "pointer",
                color: value <= star ? "gold" : "gray",
              }}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 font-bold text-center">내용</div>
          <textarea
            className="w-4/5 p-2 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="productReplyText"
            rows="4"
            onChange={handleChangeReview}
            value={review.productReplyText}
          >
            {review.productReplyText}
          </textarea>
        </div>
      </div>

      <div className="">
        <div className="flex flex-row justify-around">
          <button
            type="button"
            className="rounded p-4 w-20 bg-emerald-500 hover:bg-emerald-700 text-xs text-white"
            onClick={handleClickAdd}
          >
            추가하기
          </button>
          <button
            type="button"
            className="rounded p-4 w-20 bg-emerald-500 hover:bg-emerald-700 text-xs text-white"
            onClick={closeAddReview}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAddComponent;
