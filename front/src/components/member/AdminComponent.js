import React, { useState } from "react";
import InfoComponent from "./InfoComponent";
import { useSelector } from "react-redux";
import MemberListComponent from "./MemberListComponent";

const AdminComponent = () => {
  const [selectedTab, setSelectedTab] = useState("members"); // 선택된 탭 상태
  
  const loginInfo = useSelector((state) => state.loginSlice);

  // 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // 선택된 탭에 따라 해당 컴포넌트를 렌더링하는 함수
  const renderTabContent = () => {
    switch (selectedTab) {
      case "members":
        return <div><MemberListComponent/></div>;
      case "report":
        return <div>신고 목록</div>;
      case "orders":
        return <div>주문 처리</div>;
        case "faq":
        return <div>문의 처리</div>;
      // 다른 탭에 대한 렌더링을 추가할 수 있음
      default:
        return;
    }
  };

  return (
    <div className="flex w-full h-full flex-col rounded-lg shadow-xl min-h-screen">
      {/* 위쪽 탭 메뉴 */}
      <div className="w-full border-b">

        <div className="flex flex-row w-full">
          <button
            onClick={() => handleTabClick("members")}
            className={`border-r border-gray-300 p-3 cursor-pointer ${
              selectedTab === "members"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            회원 관리
          </button>
           <button
            onClick={() => handleTabClick("report")}
            className={`border-r border-gray-300 p-3 cursor-pointer ${
              selectedTab === "report"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            신고 목록
          </button>
          {/*<button
            onClick={() => handleTabClick("orders")}
            className={`border-r border-gray-300 p-3 cursor-pointer ${
              selectedTab === "orders"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            주문 처리
          </button>
          <button
            onClick={() => handleTabClick("faq")}
            className={`border-r border-gray-300 p-3 cursor-pointer ${
              selectedTab === "faq"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            문의 처리
          </button> */}
          {/* 다른 탭을 추가할 수 있음 */}
        </div>
      </div>
      {/* 아래쪽 탭 컨텐츠 */}
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default AdminComponent;