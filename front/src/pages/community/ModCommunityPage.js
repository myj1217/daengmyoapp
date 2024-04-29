import { Navigate, useParams } from "react-router-dom";
import ModCommunityComponent from "../../components/community/ModCommunityComponent";
import { useSelector } from "react-redux";
import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";

const ModCommunityPage = () => {
  const { communityBno } = useParams();
  const loginState = useSelector((state) => state.loginSlice);
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />

      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-40 shadow-md">
        <FaComment className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          커뮤니티 게시글 수정
        </p>
      </div>

      <ModCommunityComponent communityBno={communityBno} />
    </div>
  );
};

export default ModCommunityPage;
