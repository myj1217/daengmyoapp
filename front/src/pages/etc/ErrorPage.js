import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div id="logo" className="p-6">
        <p className="text-5xl">
          <Link to={"/"}>댕묘앞</Link>
        </p>
      </div>
      <p className="text-xl my-2">
        존재하지 않는 페이지입니다.{" "}
        <Link to={"/"} className="underline text-orange-400">
          돌아가기
        </Link>
      </p>
      <div className="bg-cover bg-no-repeat bg-center w-screen h-screen bg-error"></div>
    </div>
  );
};

export default ErrorPage;
