import MyPageComponent from "../../components/member/MyPageComponent";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
      {/* <BasicLayout /> */}
      <div className="flex flex-col w-full">
        {/* "커뮤니티" 헤더 */}
        <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-55">
          <FaUser className="w-6 h-6 mr-2" />
          마이 페이지
        </div>
        <MyPageComponent />
      </div>
    </div>
  );
};

export default MyPagePage;
