import React, { useEffect, useState } from "react";
import { getReplies, regReply } from "../../api/communityApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  communityBno: 0,
  replyRno: 0,
  replyContent: "",
  replyyWriter: "",
  regDate: "",

  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

// const ReplyComponent = ({
//   communityBno,
//   replies,
//   replyRno,
//   setReplies,
//   fetchReplies,
// }) => {
//   const [replyContent, setReplyContent] = useState("");

const ReplyComponent = ({
  // const { exceptionHandle } = useCustomLogin();
  communityBno,
  replies,
  replyRno,
  setReplies,
  fetchReplies,
}) => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    getReplies({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
    // .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  const handleReplySubmit = async () => {
    try {
      const replyData = {
        // communityBno: communityBno,
        replyRno: replyRno,
        replyContent: replyContent,
      };

      await regReply(communityBno, replyData);
      setReplyContent(""); // 댓글 작성 후 내용 초기화
      fetchReplies(communityBno, 1, 10); // 등록 후 댓글 목록 다시 가져오기
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  useEffect(() => {
    fetchReplies(communityBno, 1, 10); // communityBno와 함께 page와 size 전달
  }, [communityBno, fetchReplies]);

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
      {/* </div>
  ); */}

      {/* 댓글 입력 폼 */}
      <div className="mt-4">
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
      </div>
    </div>
  );
};

export default ReplyComponent;
