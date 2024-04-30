import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { listReply, regReply, delReply } from "../../api/communityReplyApi";
import ReplyRegComponent from "./ReplyRegComponent";
import ReplyModComponent from "./ReplyModComponent";
import { FaUserCircle } from "react-icons/fa";

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
  const [deletingReplyRno, setDeletingReplyRno] = useState(null);
  const {isLogin} = useCustomLogin();
  // 댓글 목록 및 기타 데이터 저장
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    listReply(communityBno)
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [refresh]);

  // 댓글 등록
  const handleReplySubmit = (replyContent) => {
    const replyData = {
      communityBno: communityBno,
      replyContent: replyContent,
    };

    regReply(replyData)
      .then(() => {
        // 댓글 작성 후, 댓글 목록 다시 불러오기
        listReply(communityBno).then((data) => {
          setServerData(data);
        });
      })
      .catch((err) => {
        exceptionHandle(err);
      });
  };

  return (
    <div>
      {/* 댓글 목록 */}
      <div className="mt-4  pt-4 mb-8">
        <h2 className="text-lg font-semibold mb-2 mx-2 mt-14 border-t pt-2">
          댓글 ({serverData.dtoList.length})
        </h2>
        {serverData.dtoList && serverData.dtoList.length === 0 ? (
          <div className="mb-2 mx-2">댓글이 없습니다.</div>
        ) : (
          serverData.dtoList.map((reply) => (
            
            <ReplyModComponent
              key={reply.replyRno}
              communityBno={communityBno}
              replyRno={reply.replyRno}
              replyContent={reply.replyContent}
              replyWriter={reply.replyWriter}
              regDate={reply.regDate}
              writerEmail={reply.writerEmail}
              isModified={reply.modified}
              listReplyRedirect={() => {
                // 댓글 수정 또는 삭제 후 리다이렉트하는 함수
                listReply(communityBno).then((data) => {
                  setServerData(data);
                });
              }}
            />
          ))
        )}
      </div>
        {isLogin && (
      <ReplyRegComponent
        onSubmit={handleReplySubmit}
        communityBno={communityBno}
      />
        )}
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
    </div>
  );
};

export default ReplyListComponent;
