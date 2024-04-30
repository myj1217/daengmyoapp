import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModNoticeComponent from "../../components/notice/ModNoticeComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import { IoNewspaperOutline } from "react-icons/io5";
const ModNoticePage = () => {
  const { noticeBno } = useParams();
  const loginState = useSelector((state) => state.loginSlice);
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="w-full bg-white">
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <IoNewspaperOutline className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">공지사항 수정</p>
      </div>

      <ModNoticeComponent noticeBno={noticeBno} />
    </div>
  );
};

export default ModNoticePage;
