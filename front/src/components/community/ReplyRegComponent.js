import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { regReply } from "../../api/communityReplyApi";

const initState = {
  replyRno: 0,
  communityBno: 0,
  replyContent: "",
  replyWriter: "",
  regDate: "",
};

const ReplyRegComponent = ({ communityBno }) => {
  // communityBno prop 추가
  const loginState = useSelector((state) => state.loginSlice);
  const [reply, setReply] = useState({ ...initState });
  const navigate = useNavigate();

  // 댓글 내용 변경 시 호출되는 함수
  const handleChangeReply = (e) => {
    setReply({
      ...reply,
      [e.target.name]: e.target.value,
    });
  };

  // 댓글 등록 버튼 클릭 시 호출되는 함수
// 댓글 등록 버튼 클릭 시 호출되는 함수
const handleClickReg = (e) => {
  const formData = new FormData();

  formData.append("communityBno", communityBno);
  formData.append("replyContent", reply.replyContent);
  formData.append("replyWriter", loginState.nickname);
  formData.append("writerEmail", loginState.email);

  // console.log("formData");
  // console.log(reply.replyContent);
  // console.log(loginState.nickname);

  regReply(formData)
    .then((data) => {
      // 댓글 등록 후 해당 게시글 화면으로 이동
      window.location.href = `/community/read/${communityBno}`;
    })
    .catch((error) => {
      console.error("댓글 등록 실패", error);
    });
};


  return (
    <div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="replyWriter"
            type="text"
            value={loginState.nickname}
            onChange={handleChangeReply}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="replyContent"
            rows="4"
            onChange={handleChangeReply}
            value={reply.replyContent}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Link to={`/community/read/${communityBno}`}>
          <button
            type="button"
            className="rounded p-4 w-36 bg-emerald-500 hover:bg-emerald-700 text-xl text-white"
            onClick={handleClickReg}
          >
            추가하기
          </button>
        </Link>
      </div>
    </div>
  );
};

//     <div className="mt-4">
//       <h2 className="text-lg font-semibold mb-2">댓글 작성</h2>
//       {/* 댓글 입력을 위한 form */}
//       <form>
//         <textarea
//           className="border p-2 w-full"
//           value={replyContent}
//           onChange={handleChangeReply}
//           rows="4"
//           placeholder="댓글을 입력하세요..."
//         ></textarea>
//         <button
//           className="mt-2 bg-gray-800 text-white py-2 px-4 rounded"
//           onClick={handleClickReg}
//         >
//           댓글 작성
//         </button>
//       </form>
//     </div>

export default ReplyRegComponent;
