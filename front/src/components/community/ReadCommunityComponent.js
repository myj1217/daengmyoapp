import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity, getReplies } from "../../api/communityApi";
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

  const fetchReplies = async (communityBno, page, size) => {
    try {
      const data = await getReplies(communityBno, page, size);
      setReplies(data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    setFetching(true);
    getCommunity(communityBno)
      .then((data) => {
        setCommunity(data);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching community:", error);
        setFetching(false);
      });

    fetchReplies(communityBno, 1, 10); // 예를 들어, 페이지는 1이고 사이즈는 10으로 지정
  }, [communityBno]);

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
        id="community_read_buttons"
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
        communityBno={communityBno}
        replies={replies}
        setReplies={setReplies}
        fetchReplies={fetchReplies}
      />
    </div>
  );
};

export default ReadCommunityComponent;
