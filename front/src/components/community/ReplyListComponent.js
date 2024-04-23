import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { listReply, regReply, delReply } from "../../api/communityReplyApi";
import ReplyRegComponent from "./ReplyRegComponent";
import ReplyModComponent from "./ReplyModComponent";

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

  // // 수정 모드로 변경하는 함수
  // const handleEditReply = (replyRno) => {
  //   setServerData((prevState) => {
  //     const updatedDtoList = prevState.dtoList.map((item) => {
  //       if (item.replyRno === replyRno) {
  //         return { ...item, editing: true }; // 수정 모드로 변경
  //       }
  //       return item;
  //     });
  //     return { ...prevState, dtoList: updatedDtoList };
  //   });
  // };

  // // 댓글 수정 취소를 처리하는 함수
  // const cancelEditReply = () => {
  //   setServerData((prevState) => {
  //     const updatedDtoList = prevState.dtoList.map((item) => {
  //       return { ...item, editing: false }; // 수정 모드에서 일반 모드로 변경
  //     });
  //     return { ...prevState, dtoList: updatedDtoList };
  //   });
  // };

  // // 댓글 삭제를 시작하는 함수
  // const handleDeleteReply = (replyRno) => {
  //   setDeletingReplyRno(replyRno);
  // };

  // // 댓글 삭제 취소를 처리하는 함수
  // const cancelDeleteReply = () => {
  //   setDeletingReplyRno(null);
  // };

  return (
    <div>
      {/* 댓글 목록 */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        {serverData.dtoList && serverData.dtoList.length === 0 ? (
          <div>댓글이 없습니다.</div>
        ) : (
          serverData.dtoList.map((reply) => (
            <ReplyModComponent
              key={reply.replyRno}
              communityBno={communityBno}
              replyRno={reply.replyRno}
              replyContent={reply.replyContent}
              replyWriter={reply.replyWriter}
              regDate={reply.regDate}
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

      <ReplyRegComponent
        onSubmit={handleReplySubmit}
        communityBno={communityBno}
      />

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
