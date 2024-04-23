import { useSelector } from "react-redux";
import AnimalAddComponent from "../../components/animal/AnimalAddComponent";
import { Navigate, useNavigate } from "react-router-dom";

const AnimalAddPage = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션
  if (!loginState.email) {
    return <Navigate to="/member/login" />;
  }

  return (
    <div className="p-4 w-full bg-white flex flex-col items-center">
      <div className="text-3xl font-extrabold text-center">동물 추가하기</div>

      <AnimalAddComponent />
    </div>
  );
};

export default AnimalAddPage;
