import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import dog1 from "../../asset/images/dog1.png";
import dog2 from "../../asset/images/dog2.png";
import dog3 from "../../asset/images/dog3.png";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  arrows: true, // 화살표 컨트롤 추가
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MainBanner = () => {
  return (
    <div className="main-banner relative overflow-hidden">
      <Slider {...settings}>
        <Link to="/comunity">
          <div className="slide-item">
            <img src={dog1} alt="Banner 1" className="w-full h-auto block" />
          </div>
        </Link>
        <Link to="/adopt">
          <div className="slide-item">
            <img src={dog2} alt="Banner 2" className="w-full h-auto block" />
          </div>
        </Link>
        <Link to="/products/">
          <div className="slide-item">
            <img src={dog3} alt="Banner 3" className="w-full h-auto block" />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default MainBanner;
