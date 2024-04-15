import React from "react";
import Basicmenu from "../../components/menus/Basicmenu";
import MainBanner from "../../components/main/MainBanner";
import Introduction from "../../components/main/Introduction";
import MissingPet from "../../components/main/MissingPet";
import ProductSection from "../../components/main/ProductSection";
import Reviews from "../../components/main/Reviews";
import Footer from "../../components/main/Footer";
import { div } from "@tensorflow/tfjs";

const MainPage = () => {
  return (
    <div>
      <Basicmenu />
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
