import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity, replyList, regReply } from "../../api/communityApi";
import ReplyComponent from "./ReplyComponent";

const initState = {
  communityBno: 0,
  communityTitle: "",
  communityContent: "",
  communityWriter: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadCommunityComponent = ({ communityBno }) => {
  const [community, setCommunity] = useState(initState);

  // 댓글 상태 추가
  const [replies, setReplies] = useState([]);

  //화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();
  //fetching
  const [fetching, setFetching] = useState(false);

  // 로그인 정보
  const { loginState } = useCustomLogin();

  useEffect(() => {
    setFetching(true);
    getCommunity(communityBno).then((data) => {
      setCommunity(data);
      setFetching(false);
    });
    fetchReplies(); // 댓글 목록 가져오기
  }, [communityBno]);

  // 댓글 리스트 가져오기
  const fetchReplies = () => {
    replyList(communityBno)
      .then((data) => {
        setReplies(data);
      })
      .catch((error) => {
        console.error("Error fetching replies:", error);
      });
  };

  // 댓글 등록 처리
  const handleReplySubmit = async (replyContent) => {
    try {
      const replyData = {
        communityBno: communityBno,
        replyContent: replyContent,
      };

      await regReply(communityBno, replyData);
      fetchReplies(); // 댓글 목록 다시 가져오기
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      <div
        id="community_image_zone"
        className="w-full justify-center flex  flex-col m-auto items-center"
      >
        {community.uploadFileNames &&
          community.uploadFileNames.map((fileName, i) => (
            <img
              alt="community"
              key={i}
              className="p-4 w-1/2"
              src={`${host}/community/view/${fileName}`}
            />
          ))}
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.communityTitle}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.communityContent}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">작성자</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.communityWriter}
          </div>
        </div>
      </div>

      <div
        id="product_read_buttons"
        className="flex justify-end p-4 text-sm text-white"
      >
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 bg-gray-800"
          onClick={() => moveToModify(communityBno)}
        >
          게시글
          <br />
          수정
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 w-32 bg-gray-800"
          onClick={moveToList}
        >
          목록으로
          <br />
          돌아가기
        </button>
      </div>
      {/* 댓글 컴포넌트 추가 */}
      <ReplyComponent
        replies={replies}
        setReplies={setReplies}
        handleReplySubmit={handleReplySubmit} // 댓글 등록 핸들러 전달
      />
    </div>
  );
};

export default ReadCommunityComponent;
