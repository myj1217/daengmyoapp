import React, { useState } from "react";
import { sendQna } from "../../api/qnaApi";
import { FaInfoCircle } from "react-icons/fa";

const QnaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendQna(formData);
      // Handle response as needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
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
