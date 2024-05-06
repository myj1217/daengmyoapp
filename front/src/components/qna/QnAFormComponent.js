import React, { useState } from "react";
import { sendQna } from "../../api/qnaApi";
import { FaInfoCircle } from "react-icons/fa";

const QnaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 모달 상태 추가
  const [modalOpen, setModalOpen] = useState(false);
  // 로딩 상태 추가
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 제출 시 로딩 상태 변경

    try {
      const response = await sendQna(formData);
      // 제출 후 모달 열기
      setModalOpen(true);
      // 폼 데이터 초기화
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // 이메일 발송 완료 후 로딩 상태 변경
    }
  };

  return (
    <div>
      {/* 로딩 화면 */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">이메일 발송 중...</h2>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      )}
      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">확인</h2>
            <p>문의가 성공적으로 제출되었습니다.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center mb-4">
        <FaInfoCircle className="text-gray-600 h-6 w-6 mr-2" />
        <span className="text-gray-600">
          기타 문의사항 및 후원 문의는 메일을 이용해주세요
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border border-gray-300 rounded"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded mb-4 p-2"
          placeholder="성함"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded mb-4 p-2"
          placeholder="답변 받으실 메일"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="8"
          className="w-full border border-gray-300 rounded mb-4 p-2"
          placeholder="문의 내역을 입력해주세요."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          전송하기
        </button>
      </form>
    </div>
  );
};

export default QnaForm;
