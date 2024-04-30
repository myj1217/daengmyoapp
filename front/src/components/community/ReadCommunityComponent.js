import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/rootApi";
import { getCommunity } from "../../api/communityApi";
import ReplyListComponent from "./ReplyListComponent";
import { listReply } from "../../api/communityReplyApi";
import jwtAxios from "../../utils/jwtUtil";
import { useDispatch } from "react-redux";
import { setChatVisible } from "../../slices/chatSlice";

const initState = {
  communityBno: 0,
  communityTitle: "",
  communityContent: "",
  communityWriter: "",
  communityWriterEmail: "",
  uploadFileNames: [],
};

const ReadCommunityComponent = ({ communityBno }) => {
  const [community, setCommunity] = useState(initState);
  const [replies, setReplies] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { loginState, isLogin, isAdmin } = useCustomLogin();
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

  const createChatRoom = () => {
    if (loginState.email !== community.communityWriterEmail) {
      jwtAxios
        .post(`${API_SERVER_HOST}/api/chat`, {
          userEmail1: loginState.email,
          userEmail2: community.communityWriterEmail,
        })
        .then(() => {
          dispatch(setChatVisible(true));
        })
        .catch((error) => {
          console.error("Failed to create chat room:", error);
        });
    }
  };

  const isAuthor = loginState.email === community.communityWriterEmail;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      {fetching && <div>Loading...</div>}
      <div className="px-6 pt-4 pb-2">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="font-bold text-4xl">{community.communityTitle}</h1>
          <div className="flex items-center">
            {community.communityWriter && (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                작성자: {community.communityWriter}
              </span>
            )}
            {!isAuthor && isLogin &&(
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={createChatRoom}
              >
                채팅하기
              </button>
            )}
            {isAuthor || isAdmin &&(
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                onClick={() => moveToModify(communityBno)}
              >
                수정하기
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 ml-auto" style={{ width: "fit-content" }}>
          {new Date(community.regDate).toLocaleString("ko-KR")} {community.modified && "(수정됨)"}
        </p>
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4">
            {community.uploadFileNames.map((fileName, i) => (
              <img
                key={i}
                src={`${API_SERVER_HOST}/community/view/${fileName}`}
                alt="Community content"
                className="object-contain h-80"
              />
            ))}
          </div>
        </div>
        <div className="text-gray-700 text-base mt-4">{community.communityContent}</div>
      </div>
      <ReplyListComponent replies={replies} communityBno={communityBno} />
    </div>
  );
};

export default ReadCommunityComponent;
