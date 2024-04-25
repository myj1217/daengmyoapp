import React, { useState, useEffect } from "react";
import InfoComponent from "./InfoComponent";
import { useSelector } from "react-redux";
import AdminComponent from "./AdminComponent";
import OrderListComponent from "../order/OrderListComponent";

const MyPageComponent = () => {
  const [selectedTab, setSelectedTab] = useState("profile"); // 선택된 탭 상태
  const loginInfo = useSelector((state) => state.loginSlice);
  const isAdmin =
    loginInfo.roleNames.includes("MANAGER") ||
    loginInfo.roleNames.includes("ADMIN");

  useEffect(() => {
    // URL에서 쿼리 매개변수 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    // "order" 쿼리 매개변수가 있는지 확인하고, 있다면 해당하는 탭으로 설정
    if (urlParams.has("order")) {
      setSelectedTab("orders");
    }
  }, []);

  // 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // 선택된 탭에 따라 해당 컴포넌트를 렌더링하는 함수
  const renderTabContent = () => {
    switch (selectedTab) {
      case "profile":
        return <InfoComponent />;
      case "write":
        return <div>글</div>;
      case "orders":
        return <OrderListComponent />;
      case "admin":
        return <AdminComponent />;
      // 다른 탭에 대한 렌더링을 추가할 수 있음
      default:
        return;
    }
  };

  return (
    <div className="flex w-full max-h-screen-24 ">
      {/* 왼쪽에 탭 메뉴 */}
      <div className="min-w-40">
        <div className="flex flex-col">
          <button
            onClick={() => handleTabClick("profile")}
            className={`p-3 cursor-pointer ${
              selectedTab === "profile"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            회원 정보
          </button>
          <button
            onClick={() => handleTabClick("write")}
            className={`p-3 cursor-pointer ${
              selectedTab === "write"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            글 작성 목록
          </button>
          <button
            onClick={() => handleTabClick("orders")}
            className={`p-3 cursor-pointer ${
              selectedTab === "orders"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            주문내역
          </button>
          {isAdmin && (
            <button
              onClick={() => handleTabClick("admin")}
              className={`p-3 cursor-pointer ${
                selectedTab === "admin"
                  ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                  : "transition duration-200 hover:bg-gray-400"
              }`}
            >
              관리자 페이지
            </button>
          )}
          {/* 다른 탭을 추가할 수 있음 */}
        </div>
      </div>
      {/* 오른쪽에 선택된 탭 컨텐츠 */}
      <div className="w-full shadow-lg rounded-lg">{renderTabContent()}</div>
    </div>
  );
};

export default MyPageComponent;
