import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { listReply } from "../../api/communityReplyApi";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ReplyListComponent = ({ communityBno }) => {
  const { exceptionHandle } = useCustomLogin();
  const { refresh, moveToList } = useCustomMove();

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    listReply(communityBno)
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [refresh]);

  return (
    <div>
      {/* 댓글 목록 */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        {serverData.dtoList && serverData.dtoList.length === 0 ? (
          <div>댓글이 없습니다.</div>
        ) : (
          serverData.dtoList.map((reply) => (
            <div key={reply.replyRno} className="border-b py-2">
              <div className="flex justify-between">
                <div>{reply.replyWriter}</div>
              </div>
              <div>{reply.replyContent}</div>
            </div>
          ))
        )}
      </div>

      {/* 페이지 목록 렌더링 */}
      {serverData.pageNumList && serverData.pageNumList.length > 0 && (
        <div className="flex justify-center mt-4">
          {serverData.pageNumList.map((pageNum) => (
            <button
              key={pageNum}
              className={`${
                pageNum === serverData.current
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              } border-solid border-2 border-gray-500 p-2 mx-1`}
              onClick={() => moveToList({ page: pageNum })}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      {/* <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">댓글 작성</h2>
        <textarea
          className="border p-2 w-full"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          rows="4"
          placeholder="댓글을 입력하세요..."
        ></textarea>
        <button
          className="mt-2 bg-gray-800 text-white py-2 px-4 rounded"
          onClick={handleReplySubmit}
        >
          댓글 작성
        </button>
      </div> */}
    </div>
  );
};

export default ReplyListComponent;
