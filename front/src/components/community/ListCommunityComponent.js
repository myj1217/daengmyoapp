import { useCallback, useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/rootApi";
import { communityList } from "../../api/communityApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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

const ListCommunityComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const navigate = useNavigate();

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    communityList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  const handleClickReg = useCallback(() => {
    navigate({ pathname: "../register" });
  });

  return (
    <div className="border-2 border-gray-100 mt-10 mr-2 ml-2">
      <div className="p-6">
        {serverData.dtoList &&
          serverData.dtoList.map((community, index) => (
            <div
              key={community.communityBno}
              className="flex items-center rounded shadow-md border-2 mb-4 bg-white p-4 justify-between"
              style={{ minHeight: "80px" }}
              onClick={() => moveToRead(community.communityBno)}
            >
              {/* 글 번호 추가 */}
              <div className="w-1/12 text-center">{community.communityBno}</div>
              {!community.uploadFileNames ||
              community.uploadFileNames.length === 0 ? (
                <div
                  className="my-2 mr-4"
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFont}
                    className="text-emerald-600 mr-2"
                    size="3x"
                  />
                </div>
              ) : (
                <div
                  className="my-2 mr-4"
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                >
                  {/* 이미지가 있는 경우 */}
                  <img
                    alt="community"
                    className="rounded-md"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    src={`${host}/community/view/${community.uploadFileNames[0]}`}
                  />
                </div>
              )}

              <div
                className="flex-grow flex items-center"
                style={{ width: "900px" }}
              >
                <div className="w-7/12 ml-4 font-bold text-xl">
                  {community.communityTitle}
                </div>
                <div className="w-3/12 ml-4">{community.communityWriter}</div>
                <div className="text-red-400 flex"><IoChatboxEllipsesOutline className="mr-2 w-4 mt-0.5 h-auto"/> {community.commentCount}</div>
              </div>
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

      <div className="flex justify-center">
        <button
          type="button"
          className="inline-block rounded p-3 m-6 bg-emerald-300 hover:bg-emerald-500 text-white w-48"
          onClick={handleClickReg}
        >
          게시글 등록
        </button>
      </div>
    </div>
  );
};

export default ListCommunityComponent;
