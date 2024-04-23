import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getNotice } from "../../api/noticeApi";
import { useNavigate } from "react-router-dom";

const initState = {
  noticeBno: 0,
  noticeTitle: "",
  noticeContent: "",
  noticeWriter: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadNoticeComponent = ({ noticeBno }) => {
  const [notice, setNotice] = useState(initState);

  //화면 이동용 함수
  const { moveToModify } = useCustomMove();
  const navigate = useNavigate(); // useNavigate 훅 추가

  //fetching
  const [fetching, setFetching] = useState(false);
  // 로그인 정보
  const { loginState } = useCustomLogin();

  useEffect(() => {
    setFetching(true);
    getNotice(noticeBno)
      .then((data) => {
        setNotice(data);
        console.log(data);

        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching notice:", error);
        setFetching(false);
      });
  }, [noticeBno]);

  const handleClickList = () => {
    navigate("/notice/list");
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div
        id="notice_image_zone"
        className="w-full justify-center flex  flex-col m-auto items-center"
      >
        {notice.uploadFileNames &&
          notice.uploadFileNames.map((fileName, i) => (
            <img
              alt="notice"
              key={i}
              className="p-4 w-1/2"
              src={`${host}/notice/view/${fileName}`}
            />
          ))}
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {notice.noticeTitle}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {notice.noticeContent}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {notice.noticeWriter}
          </div>
        </div>
      </div>
      <div
        id="notice_read_buttons"
        className="flex justify-end p-4 text-sm text-white"
      >
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 bg-gray-800"
          onClick={() => moveToModify(noticeBno)}
        >
          게시글
          <br />
          수정
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 w-32 bg-gray-800"
          onClick={handleClickList}
        >
          목록으로
          <br />
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default ReadNoticeComponent;
