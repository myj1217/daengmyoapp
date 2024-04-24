import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQComponent = () => {
  const faqData = [
    {
      question:
        "개인이 유기동물을 데려다 키웠을 경우 법적으로 처벌을 받을 수 있나요?",
      answer:
        "유실,유기동물을 발견했을 경우 동물보호센터나 지자체의 장에게 신고 하시기 바랍니다. 관련 규정에 따르지 않고 임의로 데려다 키웠을 경우 여러가지 민,형사사건에 휘말릴 수 있으므로 반드시 신고하여 주시기 바랍니다.",
    },
    {
      question: "야생동물 출몰 신고시 해당 업무 처리 부서는 어디인가요?",
      answer:
        "각 지자체의 환경보호과 등 ‘야생생물 보호 및 관리에 관한 법률(환경부)’ 담당부서로 신고하시기 바랍니다.",
    },
    {
      question: "유기동물 신고는 어떻게 하나요?",
      answer: "실종신고 탭에 실종신고 페이지를 이용하시길 바랍니다.",
    },
    {
      question: "실종신고 된 아이돌의 목격 제보는 어떻게 하나요?",
      answer: "목격 제보하기를 클릭해주세요.",
    },
    // {
    //   question: "",
    //   answer: "",
    // },

    // 나머지 질문과 답변 추가
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4">자주 묻는 질문</h2>
      <div>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md cursor-pointer"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              <div className="flex items-center">
                <FaQuestionCircle className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold">{faq.question}</h3>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 8.293a1 1 0 0 1 1.414 0L10 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </div>
            {expandedIndex === index && (
              <div className="flex items-center mt-2">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="text-gray-600 mr-2"
                />
                <p className="text-gray-700 p-5">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
