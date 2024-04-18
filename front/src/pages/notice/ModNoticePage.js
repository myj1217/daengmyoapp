import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModNoticeComponent from "../../components/notice/ModNoticeComponent";

const ModNoticePage = () => {
  const { noticeBno } = useParams();
  const loginState = useSelector((state) => state.loginSlice);
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">게시글 수정하기</div>

      <ModNoticeComponent noticeBno={noticeBno} />
    </div>
  );
};

export default ModNoticePage;
