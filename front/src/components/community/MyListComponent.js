import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { myCommunityList } from "../../api/myListApi";

// Initialize state
const initState = [];

const MyListComponent = () => {
  const [myPosts, setMyPosts] = useState(initState);
  const { isLogin, loginState, exceptionHandle } = useCustomLogin();
  const navigate = useNavigate();

  // Fetch my community list on login state change
  useEffect(() => {
    if (isLogin) {
      myCommunityList(loginState.email)
        .then((data) => {
          setMyPosts(data);
        })
        .catch((err) => exceptionHandle(err));
    }
  }, [isLogin, loginState.email]);

  const goRead = (bno) => {
    navigate(`/community/read/${bno}`);
  };

  return (
    <div className="p-8 w-full min-h-[calc(100vh-124px)]">
      {/* Display the number of posts */}
      {myPosts.dtoList ? (
        <div className="py-8 text-5xl border-b border-gray-300">
          작성한 글({myPosts.dtoList.length})
        </div>
      ) : (
        <div className="py-8 text-5xl border-b border-gray-300">
          작성한 글이 없습니다.
        </div>
      )}

      {/* Display the list of posts */}
      {myPosts.dtoList ? (
        <div id="my-post-list">
          <ul>
            {myPosts.dtoList.map((post) => (
              <li
                onClick={() => goRead(post.communityBno)}
                key={post.communityBno}
                className="w-full py-8 border-b border-gray-300 hover:bg-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex w-full py-1">
                    <div className="w-1/4">글 번호</div>
                    <div className="w-3/4">{post.communityBno}</div>
                  </div>
                  <div className="flex w-full py-1">
                    <div className="w-1/4">글 제목</div>
                    <div className="w-3/4">{post.communityTitle} </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>작성한 글 목록을 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default MyListComponent;
