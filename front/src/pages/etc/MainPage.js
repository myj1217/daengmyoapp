import React, { useEffect, useState } from "react";
import BasicMenu from "../../components/menus/BasicMenu";
import useCustomLogin from "../../hooks/useCustomLogin";
import MissingPet from "../../components/etc/MissingPet";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import dog1 from "../../asset/images/dog1.png";
import dog2 from "../../asset/images/dog2.png";
import dog3 from "../../asset/images/dog3.png";
import choko from "../../asset/images/choko.jpg";
import moka from "../../asset/images/moka.jpg";
import navi from "../../asset/images/navi.jpg";
import ddongyi from "../../asset/images/ddongyi.jpg";
import image from "../../images/user.png";
import { FaUser, FaPencilAlt, FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoReceipt, IoLogOut } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
  arrows: true,
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

const pets = [
  { id: 1, name: "초코", age: 2, gender: "수컷", image: choko },
  { id: 2, name: "나비", age: 3, gender: "암컷", image: navi },
  { id: 3, name: "모카", age: 1, gender: "수컷", image: moka },
  { id: 4, name: "뚱이", age: 3, gender: "암컷", image: ddongyi },
];

const PetCard = ({ pet }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <img
        style={{ height: "300px", width: "300px", objectFit: "cover" }}
        src={pet.image}
        alt={pet.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pet.name}</div>
        <p className="text-gray-700 text-base">나이: {pet.age}세</p>
        <p className="text-gray-700 text-base">성별: {pet.gender}</p>
      </div>
    </div>
  );
};

const MainPage = () => {
  const loginInfo = useSelector((state) => state.loginSlice);
  const [nickname, setNickname] = useState("");
  const { isLogin } = useCustomLogin();
  const { doLogout, moveToPath,isAdmin } = useCustomLogin();

  useEffect(() => {
    if (isLogin) {
      setNickname(loginInfo.nickname);
    }
  }, [isLogin]);

  const clickLogout = () => {
    doLogout();
    moveToPath("/");
  };

  const renderUserRole = () => {
    if (loginInfo.roleNames.includes("ADMIN")) {
      return "관리자";
    } else if (loginInfo.roleNames.includes("MANAGER")) {
      return "매니저";
    } else if (loginInfo.roleNames.includes("USER")) {
      return "유저";
    }
    return "";
  };

  return (
    <div>
      <BasicMenu />
      <div className="flex w-full h-full border border-bottom-2">
        <div className="main-banner relative overflow-hidden w-4/5 m-2 min-w-[620px] h-full rounded-lg shadow-lg ">
          <Slider {...settings}>
            <Link to="/community">
              <div className="slide-item">
                <img
                  src={dog1}
                  alt="Banner 1"
                  className="w-full h-auto block"
                />
              </div>
            </Link>
            <Link to="/animal">
              <div className="slide-item">
                <img
                  src={dog2}
                  alt="Banner 2"
                  className="w-full h-auto block"
                />
              </div>
            </Link>
            <Link to="/products/">
              <div className="slide-item">
                <img
                  src={dog3}
                  alt="Banner 3"
                  className="w-full h-auto block"
                />
              </div>
            </Link>
          </Slider>
          <div className="h-7" />
        </div>

        <div className="w-1/5 h-[350px] min-w-64 bg-green-50 flex flex-col items-center justify-center m-2 rounded-lg shadow-lg mb-2">
          <div className="w-full flex items-center justify-center mb-auto mt-2 border-b-2 pb-2">
            <p className="text-xl font-bold">프로필</p>
          </div>

          {!isLogin ? (
            <>
              <div className="text-gray-600 text-sm flex flex-col items-center justify-center h-full">
                <div className="w-full text-center">
                  로그인이 필요한 서비스입니다.
                </div>
              </div>
              <div className="w-4/5 mb-24">
                <Link to="member/login">
                  <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg cursor-pointer h-full">
                    로그인하기
                    <CiLogin className="inline-block ml-2" />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full items-center flex flex-col">
              <div className="my-2 w-1/2 rounded-md h-auto flex ">
                <div>
                  <img src={image} alt="user" className="w-12 h-auto"></img>
                </div>
                <div className="mt- ml-auto text-center">
                  <div className="text-sm text-gray-500">{renderUserRole()}</div>
                  <div className="text-lg">{nickname} 님</div>
                </div>
              </div>

              <div className="w-4/5 h-full mt-4">
                <Link to="member/mypage" className="flex justify-center items-center">
                  <button className="w-30 font-bold py-2 px-4 rounded cursor-pointer top-0 flex gap-2 hover:underline underline-offset-1">
                    <FaUser className="w-5 h-auto mt-1 " /> 
                    내 정보
                  </button>
                </Link>

                <Link to="member/mypage?write"className="flex justify-center items-center">
                  <button className="w-30 font-bold py-2 px-4 rounded cursor-pointer top-0 flex gap-2 hover:underline underline-offset-1">
                    <FaPencilAlt className="w-5 h-auto mt-1" /> 글 작성 목록
                  </button>
                </Link>

                <Link to="member/mypage?order"className="flex justify-center items-center">
                  <button className="w-30 font-bold py-2 px-4 rounded cursor-pointer top-0 flex gap-2 hover:underline underline-offset-1">
                    <IoReceipt className="w-5 h-auto mt-1" /> 주문내역
                  </button>
                </Link>
                {isAdmin && (
                <Link to="member/mypage?admin"className="flex justify-center items-center ">
                  <button className="w-30 font-bold py-2 px-4 rounded cursor-pointer top-0 flex gap-2 hover:underline underline-offset-1">
                    <RiAdminFill className="w-5 h-auto mt-1 " /> 관리자 페이지
                  </button>
                </Link>
                )}
              </div>
              <button
                onClick={clickLogout}
                className="w-4/5 mb-4 h-12 rounded-md shadow-md justify-center items-center text-white bg-red-400 hover:bg-red-500 transition-colors duration-300 cursor-pointer flex"
              >
                <IoLogOut className="w-5 h-auto mt-1" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="py-8">
        <div className="text-center text-4xl font-bold mb-6">
          당신을 기다리고 있는 아이들
        </div>
        <div className="flex flex-row justify-center gap-4 p-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="animal/list">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg cursor-pointer">
              더보기
            </button>
          </Link>
        </div>
      </div>
      <div className="text-center text-4xl font-bold mb-6">
        우리 아이를 찾고 있어요
      </div>

      <MissingPet />

      <footer className="bg-gray-200 text-gray-800 text-center p-4">
        <div className="max-w-screen-lg mx-auto text-sm">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="/" className="hover:underline">
              홈
            </a>
            <a href="/about" className="hover:underline">
              회사소개
            </a>
            <a href="/services" className="hover:underline">
              서비스
            </a>
            <a href="/contact" className="hover:underline">
              연락처
            </a>
            <a href="/privacy" className="hover:underline">
              개인정보 처리방침
            </a>
            <a href="/terms" className="hover:underline">
              이용약관
            </a>
          </div>
          <div className="flex justify-center space-x-6 mb-2">
            <a
              href="https://facebook.com"
              className="text-xl hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-xl hover:text-pink-600"
            >
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" className="text-xl hover:text-black">
              <FaTiktok />
            </a>
            <a
              href="https://youtube.com"
              className="text-xl hover:text-red-600"
            >
              <FaYoutube />
            </a>
          </div>
          <div>© 2024 Daengmyoapp.PTY.LTD</div>
          <div>
            문의:{" "}
            <a href="mailto:info@company.com" className="underline">
              info@company.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
