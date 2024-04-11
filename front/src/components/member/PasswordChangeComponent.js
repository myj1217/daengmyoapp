import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { modifyPassword } from '../../api/memberApi';




const PasswordChangeComponent = ({ closeModal }) => {
    const loginInfo = useSelector((state) => state.loginSlice);
    const [member, setMember] = useState({
        email: loginInfo.email,
          pw: "",
          newPw:"",
          confirmPassword: "",
      });
    
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLength, setPasswordLength] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // 비밀번호 일치 여부 확인
    if (member.newPw !== member.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      }));
      setPasswordMatch(false);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
      setPasswordMatch(true);
    }
  
    // 새 비밀번호의 길이가 4에서 16 문자가 아닌 경우 오류 추가
    if (member.newPw.length < 4 || member.newPw.length > 16) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPw: "새 비밀번호는 4자리에서 16자여야 합니다.",
      }));

    } else {
      setPasswordLength(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPw: "",
      }));
    }
  }, [member.newPw, member.confirmPassword]);
  



  const handleChangePassword = async () => {
    if(!passwordMatch || !passwordLength){
        return;
      }
    const { confirmPassword, ...info } = member;
    try {
        await modifyPassword(info);
        closeModal();
        alert("비밀번호가 재설정 되었습니다.");
    
      } catch (error) {
        console.error("비밀번호 재설정 실패:", error);
        alert(error);
      }
    };

  return (
    <div>
        {/* 기존 비밀번호 입력 폼 */}
        <div className="mb-4">
        <label htmlFor="pw" className="block text-gray-700 font-bold">기존 비밀번호
        </label>
        <span className="text-gray-500 ml-1 text-sm">*카카오 회원의 경우, <a href="/member/forgot-password"><u>비밀번호 찾기</u></a>를 통해서 초기화 해주시길 바랍니다.</span>
        <input
          type="password"
          id="pw"
          name="pw"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="기존의 비밀번호를 입력하세요"
          value={member.pw}
          onChange={handleChange}
        />
      </div>
      {/* 새 비밀번호 입력 폼 */}
      <div className="mb-4">
        <label htmlFor="newPw" className="block text-gray-700 font-bold">새 비밀번호</label>
        {errors.newPw && <p className="text-red-500">*{errors.newPw}</p>}
        <input
          type="password"
          id="newPw"
          name="newPw"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="새 비밀번호를 입력하세요"
          value={member.newPw}
          onChange={handleChange}
        />
      </div>
      {/* 비밀번호 확인 입력 폼 */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold ">비밀번호 확인</label>
        {errors.confirmPassword && <p className="text-red-500">*{errors.confirmPassword}</p>}
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="비밀번호 확인"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {/* 비밀번호 변경하기 버튼 */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleChangePassword}
        >
          비밀번호 변경
        </button>
        {/* 모달 닫기 버튼 */}
        <button
          className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={closeModal}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeComponent;
