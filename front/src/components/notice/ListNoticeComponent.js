import { useCallback, useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/rootApi";
import { noticeList } from "../../api/noticeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont, faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListNoticeComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const navigate = useNavigate();

  // serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  const isAdmin = useSelector((state) => state.loginSlice.isAdmin);

  const handleClickReg = useCallback(() => {
    navigate({ pathname: "../register" });
  });

  useEffect(() => {
    noticeList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-gray-300 mt-10 mr-2 ml-2">
      <div className="p-6">
        {serverData.dtoList &&
          serverData.dtoList.map((notice, index) => (
            <div
              key={notice.noticeBno}
              className="flex items-center rounded shadow-md border-2 mb-4 p-4 bg-white cursor-pointer"
              onClick={() => moveToRead(notice.noticeBno)}
            >
              {/* 글 번호 추가 */}
              <div className="w-1/12 text-center">{notice.noticeBno}</div>

              {/* 글 제목 추가 */}
              <div className="w-7/12 ml-4 font-bold text-xl">
                {notice.noticeTitle}
              </div>
              {/* 폰트어썸 아이콘 추가 */}
              <div className="w-1/12 overflow-hidden flex items-center justify-center">
                {notice.uploadFileNames && notice.uploadFileNames.length > 0 ? (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-emerald-600"
                    size="lg"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faFont}
                    className="text-emerald-600"
                    size="lg"
                  />
                )}
              </div>

              {/* 작성자 추가 */}
              <div className="w-3/12 ml-4">관리자</div>
            </div>
          ))}
      </div>

      {/* 페이지 목록 렌더링 */}
      {serverData.pageNumList && serverData.pageNumList.length > 0 && (
        <div className="flex justify-center mt-4">
          {serverData.pageNumList.map((pageNum) => (
            <button
              key={pageNum}
              className={`${
                pageNum === serverData.current
                  ? "bg-teal-300 text-white"
                  : "bg-white text-black"
              } border-solid border-2 border-gray-500 p-2 mx-1`}
              onClick={() => moveToList({ page: pageNum })}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-block rounded p-3 m-6 bg-emerald-300 hover:bg-emerald-500 text-white w-48"
            onClick={handleClickReg}
          >
            게시글 등록
          </button>
        </div>
      )}
    </div>
  );
};

export default ListNoticeComponent;
