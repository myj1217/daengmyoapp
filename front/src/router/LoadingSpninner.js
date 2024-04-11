import React from "react";
// import logo from "../images/logo.png";

const LoadingSpinner = () => {
  const spinnerStyle = {
    borderWidth: "4px",
    borderTopColor: "transparent",
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="relative">
        {/* <img src={logo} alt="Loading" className="h-32 w-32 mb-4" /> */}
        <div
          className="absolute top-0 right-0 bottom-0 left-0 m-auto h-32 w-32 rounded-full border-solid animate-spin"
          style={spinnerStyle}
        ></div>
      </div>
      <span className="text-lg font-semibold text-orange-500">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;