import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();

  return (
    <div className="flex flex-col">
      {/* <div className="text-center text-gray-800">
        로그인시에 자동 가입처리 됩니다
      </div> */}
      <div className="flex justify-center w-full">
        <div className="text-center p-4 text-white font-extrabold w-full bg-yellow-500 shadow-sm rounded p-2">
          <Link to={link}>카카오 계정으로 로그인하기</Link>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginComponent;
