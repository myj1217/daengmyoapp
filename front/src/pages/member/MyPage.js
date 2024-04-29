import MyPageComponent from "../../components/member/MyPageComponent";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";

const MyPagePage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <BasicMenu />
      <div className="flex flex-col w-full">
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-40 shadow-md">
          <FaUser className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
          <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">마이 페이지</p>
        </div>
        <MyPageComponent />
      </div>
    </div>
  );
};

export default MyPagePage;
