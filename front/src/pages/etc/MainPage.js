import React from "react";
import BasicMenu from "../../components/menus/BasicMenu";
import MainBanner from "../../components/main/MainBanner";
import Introduction from "../../components/main/Introduction";
import MissingPet from "../../components/main/MissingPet";
import Footer from "../../components/main/Footer";

const MainPage = () => {
  return (
    <div>
      <BasicMenu />
      <MainBanner />
      <Introduction />
      <div className="text-center text-4xl font-bold mb-6">
        우리 아이를 찾고 있어요
      </div>
      <MissingPet />

      <Footer />
    </div>
  );
};

export default MainPage;
