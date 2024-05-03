import React, { useState, useEffect } from "react";
import { resetPw, sendCode } from "../../api/memberApi";
import { useNavigate } from "react-router-dom";

const ForgotPasswordComponent = () => {
  const [resetData, setResetData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLength, setPasswordLength] = useState(false);

  const handleSendVerificationCode = async () => {
    const email = resetData.email;
    setIsSendingCode(true);
    try {
      await sendCode(email);
      alert("작성하신 이메일로 인증코드가 전송되었습니다!");
      setShowEmailInput(false); // 이메일 입력 폼 숨기기
    } catch (error) {
      console.error("이메일 전송 실패:", error);
      alert(error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleRetrySendVerificationCode = () => {
    setShowEmailInput(true); // 이메일 입력 폼 보이기
  };

  useEffect(() => {
    // 비밀번호 일치 여부 확인
    if (resetData.newPassword !== resetData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
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
    if (resetData.newPassword.length < 4 || resetData.newPassword.length > 16) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "새 비밀번호는 4자리에서 16자여야 합니다.",
      }));
    } else {
      setPasswordLength(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "",
      }));
    }
  }, [resetData.newPassword, resetData.confirmPassword]);

  const handlePasswordReset = async () => {
    // 'confirmPassword'는 백엔드로 전송할 필요가 없으므로 제외
    const { confirmPassword, ...resetPwData } = resetData;
    if (!passwordMatch || !passwordLength) {
      scrollToTop();
      return;
    }
    try {
      await resetPw(resetPwData);
      alert("비밀번호가 재설정 되었습니다.");
      navigate("/member/login", { replace: true });
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      alert(error);
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg w-1/2">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        비밀번호 찾기
      </h2>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          이메일 주소
        </label>
        <input
          type="email"
          name="email"
          value={resetData.email}
          onChange={handleChange}
          required
          readOnly={!showEmailInput || isSendingCode} // 이메일 입력 폼 비활성화
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
            !showEmailInput || isSendingCode
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-50"
          }`}
          placeholder="이메일"
        />

        {showEmailInput ? (
          <button
            onClick={handleSendVerificationCode}
            disabled={isSendingCode}
            className={`w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSendingCode
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
          >
            {isSendingCode ? "인증코드 전송 중입니다..." : "인증코드 받기"}
          </button>
        ) : (
          <button
            onClick={handleRetrySendVerificationCode}
            className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            인증코드 다시 받기
          </button>
        )}
      </div>
      {!showEmailInput && (
        <>
          <label
            htmlFor="verificationCode"
            className="block text-sm font-medium text-gray-700"
          >
            인증코드
          </label>
          <input
            type="text"
            name="verificationCode"
            value={resetData.verificationCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
            placeholder="인증코드"
          />
          <div className="mt-4"></div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            새 비밀번호
          </label>
          {errors.newPassword && (
            <p className="text-red-500">*{errors.newPassword}</p>
          )}
          <input
            type="password"
            name="newPassword"
            value={resetData.newPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
            placeholder="새 비밀번호 (4~16자)"
          />
          <div className="mt-4"></div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호 확인
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500">*{errors.confirmPassword}</p>
          )}
          <input
            type="password"
            name="confirmPassword"
            value={resetData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
            placeholder="비밀번호 확인"
          />

          <button
            onClick={handlePasswordReset}
            className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            새 비밀번호로 재설정하기
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordComponent;
