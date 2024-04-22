import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity } from "../../api/communityApi";
import ReplyListComponent from "./ReplyListComponent";
import { listReply } from "../../api/communityReplyApi";
import { useNavigate } from "react-router-dom";

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
  const { moveToModify } = useCustomMove();
  const navigate = useNavigate(); // useNavigate 훅 추가

  //fetching
  const [fetching, setFetching] = useState(false);

  // 로그인 정보
  const { loginState } = useCustomLogin();

  useEffect(() => {
    setFetching(true);
    getCommunity(communityBno)
      .then((data) => {
        setCommunity(data);
        console.log(data);

        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching community:", error);
        setFetching(false);
      });
  }, [communityBno]);

  useEffect(() => {
    if (communityBno) {
      // communityBno가 정의되어 있는 경우에만 실행

      setFetching(true);
      listReply(communityBno)
        .then((data) => {
          setReplies(data);
          setFetching(false);
        })
        .catch((error) => {
          console.error("Error fetching replies:", error);
          setFetching(false);
        });
    }
  }, [communityBno]);

  const handleClickList = () => {
    navigate("/community/list");
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="w-full justify-center flex flex-col items-center"></div>
      <div className="flex justify-center mb-4">
        <div className="relative flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.communityTitle}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.uploadFileNames.map((fileName, i) => (
              <img
                key={i}
                className="p-4 max-w-full h-auto"
                src={`${host}/community/view/${fileName}`}
                alt="community"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {community.communityContent}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative flex w-full flex-wrap items-stretch">
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
          onClick={handleClickList}
        >
          목록으로
          <br />
          돌아가기
        </button>
      </div>
      <ReplyListComponent replies={replies} communityBno={communityBno} />
    </div>
  );
};
export default ReadCommunityComponent;
