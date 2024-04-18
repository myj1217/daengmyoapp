import React from "react";
import { replyDel } from "../../api/productReplyApi";
import { useNavigate } from "react-router-dom";

const ReviewItemComponent = ({
  prno,
  productReplyer,
  productReplyText,
  regDate,
  reviewRedirect,
  pno,
}) => {
  const navigate = useNavigate();
  // 리뷰 삭제 핸들러
  const reviewDeleteHandler = () => {
    if (window.confirm("해당 리뷰를 정말로 삭제하시겠습니까?") === false) {
      return;
    }
    // setFetching(true);
    replyDel(prno).then((data) => {
      // setResult("Deleted");
      //   setFetching(false);
    });

    navigate(`/products/read/${pno}`);
    reviewRedirect();
  };

  return (
    <li
      key={prno}
      className={
        "border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
      }
    >
      <div className="flex text-lg p-4 justify-between">
        <div className="w-1/6 text-center p-1">{productReplyer}</div>
        <div className="w-3/6 text-center p-1">{productReplyText}</div>
        <div className="w-1/6 text-center p-1">{regDate}</div>
        <div className="w-1/6 text-center p-1">
          <button
            className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-base text-white w-12 rounded-lg"
            onClick={reviewDeleteHandler}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReviewItemComponent;
