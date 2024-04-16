import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity, regReply, replyList } from "../../api/communityApi";

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

  // 댓글 내용 상태 추가
  const [replyContent, setReplyContent] = useState("");
  // 댓글 목록 상태 추가
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

  // 댓글 리스트
  const fetchReplies = () => {
    replyList(communityBno)
      .then((data) => {
        setReplies(data);
      })
      .catch((error) => {
        console.error("Error fetching replies:", error);
      });
  };

  // 댓글 등록
  const handleReplySubmit = async () => {
    try {
      const replyData = {
        communityBno: communityBno,
        replyContent: replyContent,
      };

      await regReply(communityBno, replyData);
      setReplyContent(""); // 댓글 작성 후 내용 초기화
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
      {/* 댓글 목록 */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>
        {replies.map((reply) => (
          <div key={reply.replyRno} className="border-b py-2">
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

export default ReadCommunityComponent;
