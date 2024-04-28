import { useSelector } from "react-redux";
import RegCommunityComponent from "../../components/community/RegCommunityComponent";
import { Navigate } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";

const RegCommunityPage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <div className="text-3xl font-extrabold">게시물 등록하기</div>

      <RegCommunityComponent />
    </div>
  );
};

export default RegCommunityPage;
