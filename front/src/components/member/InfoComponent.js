import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getMember, deleteId } from "../../api/memberApi";

const InfoComponent = () => {
  const [member, setMember] = useState({
    email: "",
    name: "",
    nickname: "",
    zipCode: "",
    streetAddress: "",
    detailAddress: "",
    number: "",
  });

  const loginInfo = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  const [isModify, setIsModify] = useState(false); // 수정 모드 상태 추가

  useEffect(() => {
    const get = async () => {
      const memberInfo = await getMember(loginInfo.email);
    setMember({ ...memberInfo });
  };
  get();
},[]);

  const goModify = () => {
    setIsModify(true); // 수정 모드로 변경
  };



  const { doLogout } = useCustomLogin();

  const remove = async () => {

    const isConfirmed = window.confirm(
        "탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      );
  
      if (isConfirmed && loginInfo.email == member.email) {
    try {
      await deleteId(member);
      alert("정상적으로 회원탈퇴 되었습니다.");
      doLogout();
      navigate({ pathname: "/member/login" }, { replace: true });
    } catch (error) {
      alert(error);
    }}else{
        
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      {isModify ? ( // 수정 모드일 때 ModifyComponent 렌더링
        <ModifyComponent setIsModify={setIsModify} />
      ) : (
        <div className="w-full p-8 bg-white rounded-lg shadow-xl">
          <label>이메일</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="email"
            value={member.email}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="name">이름(실제 이름)</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="name"
            name="name"
            value={member.name}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="nickname">닉네임</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="nickname"
            name="nickname"
            value={member.nickname}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="zipCode">우편번호</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="zipCode"
            name="zipCode"
            value={member.zipCode}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="streetAddress">주소</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="streetAddress"
            value={member.streetAddress}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="detailAddress">상세 주소</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="detailAddress"
            name="detailAddress"
            value={member.detailAddress}
            readOnly // 읽기 전용으로 설정
          />
          <label htmlFor="number">휴대폰 번호</label>
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
            type="text"
            id="number"
            name="number"
            value={member.number}
            readOnly // 읽기 전용으로 설정
          />
          <button
            className="w-full bg-gray-400 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-200 mt-1"
            onClick={goModify}
          >
            정보 수정하기
          </button>
          <button
            className="w-full bg-red-400 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition duration-200 mt-1"
            onClick={remove}
          >
            회원탈퇴
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoComponent;
