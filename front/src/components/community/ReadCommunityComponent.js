import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity } from "../../api/communityApi";
import ReplyListComponent from "./ReplyListComponent";
import { listReply } from "../../api/communityReplyApi";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../utils/jwtUtil";
import { useDispatch,useSelector} from 'react-redux';
import { setChatVisible, selectChatVisible, setNewMessageArrived, selectNewMessageArrived } from "../../slices/chatSlice";  

const initState = {
  communityBno: 0,
  communityTitle: "",
  communityContent: "",
  communityWriter: "",
  communityWriterEmail: "",
  uploadFileNames: [],
};

const host = API_SERVER_HOST;



const ReadCommunityComponent = ({ communityBno }) => {
  const [community, setCommunity] = useState(initState);
  const [replies, setReplies] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { loginState } = useCustomLogin();
  const navigate = useNavigate();
  const { moveToModify } = useCustomMove();
  const dispatch = useDispatch();
  

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
  }, [communityBno]);

  useEffect(() => {
    if (communityBno) {
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

  const createChatRoom = () => {
    if (loginState.email !== community.communityWriterEmail) {
      jwtAxios.post(`${API_SERVER_HOST}/api/chat`, {
        userEmail1: loginState.email,
        userEmail2: community.communityWriterEmail,
      });
      dispatch(setChatVisible(true));
    }
  };

  const isAuthor = loginState.email === community.communityWriterEmail;

  return (
    <div className="w-ful h-full p-4">
    <div className="border-2 border-gray-300 m-2 p-4">
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
        {!isAuthor && (
          <button
            type="button"
            className="inline-block rounded p-4 m-2 w-32 bg-emerald-500 hover:bg-emerald-700"
            onClick={createChatRoom}
          >
            채팅하기
          </button>
        )}
        {isAuthor && (
          <button
            type="button"
            className="inline-block rounded p-4 m-2 w-32 bg-emerald-500 hover:bg-emerald-700"
            onClick={() => moveToModify(communityBno)}
          >
            게시글
            <br />
            수정
          </button>
        )}
        <button
          type="button"
          className="rounded p-4 m-2 w-32 bg-emerald-500 hover:bg-emerald-700"
          onClick={handleClickList}
        >
          목록으로
          <br />
          돌아가기
        </button>
      </div>
      <ReplyListComponent replies={replies} communityBno={communityBno} />
    </div>
    </div>
  );
};
export default ReadCommunityComponent;
