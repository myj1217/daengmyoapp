import React, { useState } from "react";

const ReplyComponent = ({ replies, setReplies }) => {
  const [replyContent, setReplyContent] = useState("");
  const [replyWriter, setReplyWriter] = useState(""); // replyWriter 변수 선언 및 초기화

  const handleReplySubmit = () => {
    // 댓글 등록 처리
    const newReply = {
      replyWriter: replyWriter,
      replyContent: replyContent,
    };
    setReplies([...replies, newReply]);
    setReplyContent(""); // 댓글 작성 후 내용 초기화
  };

  return (
    <div>
      {/* 댓글 목록 */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        {replies.map((reply, index) => (
          <div key={index} className="border-b py-2">
            <div className="flex justify-between">
              <div>{reply.replyWriter}</div>
              {/* <div>{reply.replyDate}</div> */}
            </div>
            <div>{reply.replyContent}</div>
          </div>
        ))}
      </div>

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
