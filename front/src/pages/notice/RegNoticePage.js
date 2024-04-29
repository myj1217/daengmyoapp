import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegNoticeComponent from "../../components/notice/RegNoticeComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import { IoNewspaperOutline } from "react-icons/io5";
const RegNoticePage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <IoNewspaperOutline className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">공지사항 등록</p>
      </div>

      <RegNoticeComponent />
    </div>
  );
};

export default RegNoticePage;
