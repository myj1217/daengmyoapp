import { useCallback, useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/rootApi";
import { communityList } from "../../api/communityApi";

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

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    communityList({ page, size })
      .then((data) => {
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  const handleClickReg = useCallback(() => {
    navigate({ pathname: "../register" });
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className="border-2 border-gray-100 mt-10 m-2 p-4">
      {/* Column Labels */}
      <div className="flex justify-between items-center bg-gray-200 p-4 rounded-t-md">
        <span className="w-1/12 text-center">번호</span>
        <span className="flex-grow text-center">제목 (댓글수)</span>
        <span className="w-2/12 text-center">글쓴이</span>
        <span className="w-2/12 text-center whitespace-nowrap">날짜</span>
      </div>
      {/* List Items */}
      <div className="p-6">
        {serverData.dtoList &&
          serverData.dtoList.map((community) => (
            <div
              key={community.communityBno}
              className="flex items-center rounded shadow-md border-b mb-4 bg-white p-4 hover:bg-gray-50"
              onClick={() => moveToRead(community.communityBno)}
            >
              <div className="w-1/12 text-center">{community.communityBno}</div>
              <div className="flex-grow flex items-center ml-2">
                {community.uploadFileNames &&
                  community.uploadFileNames.length > 0 && (
                    <img
                      alt="Thumbnail"
                      className="rounded-md w-10 h-10 mr-2"
                      src={`${host}/community/view/${community.uploadFileNames[0]}`}
                    />
                  )}
                <span>
                  {community.communityTitle}{" "}
                  <span className="text-red-500">
                    ({community.commentCount || 0})
                  </span>
                </span>
              </div>
              <div className="w-2/12 text-center">
                {community.communityWriter}
              </div>
              <div className="w-2/12 text-center whitespace-nowrap">
                {formatDate(community.regDate)}
              </div>
            </div>
          ))}
      </div>
      {/* Pagination */}
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
      {/* Register Button */}
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
