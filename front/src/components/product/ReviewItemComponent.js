import React, { useState } from "react";
import { replyDel } from "../../api/productReplyApi";
import { useNavigate } from "react-router-dom";
import FetchingModal from "../common/FetchingModal";
// import ResultModal from "../common/ResultModal";

const ReviewItemComponent = ({
  prno,
  productReplyer,
  productReplyText,
  regDate,
  reviewRedirect,
  pno,
  star,
}) => {
  const [fetching, setFetching] = useState(false);
  // const navigate = useNavigate();
  // const [result, setResult] = useState(null);

  // 리뷰 삭제 핸들러
  const reviewDeleteHandler = () => {
    if (window.confirm("해당 리뷰를 정말로 삭제하시겠습니까?") === false) {
      return;
    }

    setFetching(true);

    replyDel(prno)
      .then((data) => {
        // setResult(true);
        // setResult("Deleted");
        // setFetching(false);
        reviewRedirect();
      })
      .catch((error) => {
        console.error("리뷰 삭제 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("해당 리뷰가 성공적으로 삭제되었습니다.");
  };

  // const closeModal = () => {
  //   //ResultModal 종료
  //   setResult(null);
  //   navigate({ pathname: "../" });
  // };

  return (
    <li
      key={prno}
      className={
        "border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
      }
    >
      {fetching ? <FetchingModal /> : <></>}
      {/* {result ? (
        <ResultModal
          title={"리뷰 삭제"}
          // content={`${result}번째 상품으로 등록되었습니다!`}
          content={"성공적으로 리뷰가 삭제되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )} */}
      <div className="flex text-lg p-4 justify-between">
        <div className="w-2/12 text-center p-1">
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                name="star"
                key={value}
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
        <div className="w-6/12 text-center p-1">{productReplyText}</div>
        <div className="w-1/12 text-center p-1">{productReplyer}</div>
        <div className="w-1/12 text-center p-1">{regDate}</div>
        <div className="w-2/12 text-center p-1">
          <button
            className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
            onClick={reviewDeleteHandler}
            disabled={fetching} // 요청 중일 때 버튼 비활성화
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReviewItemComponent;
