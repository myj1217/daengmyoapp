import { useSelector } from "react-redux";
import MissingPetReport from "../../components/missing/MissingPetReport";
import { Navigate, useNavigate } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";
import join from "../../asset/images/join.jpg"; // 이미지 임포트 확인

const MissingPetReportPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }

  const backgroundStyle = {
    backgroundImage: `url(${join})`, // 이미지를 url 함수 내에 삽입
    backgroundSize: "cover", // 배경 이미지가 div를 꽉 채우도록 설정
    backgroundPosition: "center", // 배경 이미지가 중앙에 위치하도록 설정
  };

  return (
    <div className="w-full h-full">
    <BasicMenu />
    <div
      style={backgroundStyle}
      className="w-full bg-white flex flex-col items-center"
    >
      
      <MissingPetReport />
    </div>
    </div>
  );
};

export default MissingPetReportPage;
