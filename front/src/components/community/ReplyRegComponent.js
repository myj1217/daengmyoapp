import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const loginState = useSelector((state) => state.loginSlice);
  const [reply, setReply] = useState({ ...initState });

  const handleChangeReply = (e) => {
    setReply({
      ...reply,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickReg = () => {
    const formData = new FormData();

    formData.append("communityBno", communityBno);
    formData.append("replyContent", reply.replyContent);
    formData.append("replyWriter", loginState.nickname); // 작성자 값을 넘겨줌
    formData.append("writerEmail", loginState.email);

    regReply(formData)
      .then(() => {
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
          {/* <div className="w-1/5 p-6 text-right font-bold">작성자</div> */}
          {/* <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            {loginState.nickname}
          </div> */}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          {/* <div className="w-[120px] p-6 text-right font-bold mr-12 mb-24">댓글 작성</div> */}
          <textarea
            className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y ml-2"
            name="replyContent"
            rows="4"
            onChange={handleChangeReply}
            value={reply.replyContent}
          />
        </div>
        <Link to={`/community/read/${communityBno}`}>
          <button
            type="button"
            className="rounded p-4 w-36 bg-emerald-500 hover:bg-emerald-700 text-xl text-white mt-12 ml-4 mr-6"
            onClick={handleClickReg}
          >
            추가하기
          </button>
        </Link>
      </div>
      
      <div className="flex justify-end">
        
      </div>
    </div>
  );
};

export default ReplyRegComponent;
