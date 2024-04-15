import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
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
          <a href="https://twitter.com" className="text-xl hover:text-blue-400">
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
          <a href="https://youtube.com" className="text-xl hover:text-red-600">
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
  );
};

export default Footer;
