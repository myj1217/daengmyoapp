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
  const { isAdmin } = useCustomLogin();

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
    <div className="max-w-7xl mx-auto mt-10">
      {fetching ? <FetchingModal /> : <></>}
      <div className="px-6 pt-4 pb-2">
        <div className="border-b pb-4 flex justify-between items-center">
          <h1 className="font-bold text-4xl">{notice.noticeTitle}</h1>
          <div className="flex items-center">
            {isAdmin && (
              <button
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full mr-2"
                onClick={() => moveToModify(noticeBno)}
              >
                수정하기
              </button>
            )}
            <button
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleClickList}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 ml-auto" style={{ width: "fit-content" }}>
          작성자 : {notice.noticeWriter}
        </p>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4">
            {notice.uploadFileNames.map((fileName, i) => (
              <img
                key={i}
                src={`${host}/notice/view/${fileName}`}
                alt="Notice content"
                className="object-contain h-48"
              />
            ))}
          </div>
        </div>
        <div className="text-gray-700 text-base mt-4">{notice.noticeContent}</div>
      </div>
    </div>
  );
};

export default ReadNoticeComponent;
