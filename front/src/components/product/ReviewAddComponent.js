import { useRef, useState } from "react";
import { replyAdd } from "../../api/productReplyApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initState = {
  prno: 0,
  pno: 0,
  productReplyText: "",
  productReplyer: "",
  regDate: "",
};

const ReviewAddComponent = ({ handleCloseModal, pno, reviewRedirect }) => {
  const loginState = useSelector((state) => state.loginSlice);

  const [review, setReview] = useState({ ...initState });
  //   const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove(); //이동을 위한 함수
  const navigate = useNavigate();

  // 작성한 내용 반응
  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  // 추가 버튼 클릭 시 작동
  const handleClickAdd = (e) => {
    // const files = uploadRef.current.files;

    const formData = new FormData();

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("files", files[i]);
    // }

    //other data
    // console.log(pno);
    // console.log(review.productReplyText);
    // console.log(loginState.nickname);
    console.log(formData);

    formData.append("pno", pno);

    formData.append("productReplyText", review.productReplyText);
    // formData.append("regDate", review.regDate);

    formData.append("productReplyer", loginState.nickname);

    // console.log("formData");
    // console.log(formData);

    setFetching(true);

    replyAdd(formData).then((data) => {
      console.log("formData");
      console.log(data);

      setFetching(false);
      setResult(data.result);
      console.log(result);
    });
    reviewRedirect();
    window.alert("리뷰가 성공적으로 추가되었습니다.");

    handleCloseModal();

    // useEffect 트리거
    
  };

  const closeModal = () => {
    //ResultModal 종료
    setResult(null);
    moveToList({ page: 1 }); //모달 창이 닫히면 이동
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={"상품 등록"}
          // content={`${result}번째 상품으로 등록되었습니다!`}
          content={"성공적으로 상품이 등록되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
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
      {/* <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="regDate"
            type={"number"}
            value={review.regDate}
            onChange={handleChangeReview}
          ></input>
        </div>
      </div> */}
      {/* <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div> */}
      {/* <Link to={`/products/read/${pno}`}> */}
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
      {/* </Link> */}
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
