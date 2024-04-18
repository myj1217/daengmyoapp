import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegNoticeComponent from "../../components/notice/RegNoticeComponent";

const RegNoticePage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">게시물 추가하기</div>

      <RegNoticeComponent />
    </div>
  );
};

export default RegNoticePage;
