import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getOne } from "../../api/missingApi";
import { replyAdd } from "../../api/missingReplyApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import FetchingModal from "../common/FetchingModal";
import ReportListComponent from "../../components/missing/ReportListComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";

const MissingReadComponent = ({ mno }) => {
  const [missing, setMissing] = useState({
    mno: 0,
    mname: "",
    gender: "",
    age: 0,
    description: "",
    uploadFileNames: [],
    latitude: null,
    longitude: null,
    replies: [],
    newReply: "",
    star: 3,
  });
  const [fetching, setFetching] = useState(false);
  const loginState = useSelector((state) => state.loginSlice);
  const mapContainer = useRef(null);
  const imageContainerRef = useRef(null);
  const infoContainerRef = useRef(null);
  const { isLogin } = useCustomLogin();
  const navigate = useNavigate();

  const loginHandler = () => {
    window.alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
    navigate("/member/login");
  };

  useEffect(() => {
    setFetching(true);
    getOne(mno).then((data) => {
      setMissing({ ...missing, ...data, replies: data.replies || [] });
      setFetching(false);
    });
  }, [mno]);

  useEffect(() => {
    if (missing.latitude && missing.longitude) {
      const center = new window.kakao.maps.LatLng(
        missing.latitude,
        missing.longitude
      );
      const options = { center, level: 3 };
      const map = new window.kakao.maps.Map(mapContainer.current, options);
      new window.kakao.maps.Marker({ position: center, map });
    }
  }, [missing.latitude, missing.longitude]);

  useEffect(() => {
    const setEqualHeight = () => {
      if (imageContainerRef.current && infoContainerRef.current) {
        const totalHeight = infoContainerRef.current.offsetHeight;
        imageContainerRef.current.style.height = `${totalHeight}px`;
      }
    };
    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);
    return () => window.removeEventListener("resize", setEqualHeight);
  }, [missing]);

  const addReply = () => {
    if (!missing.newReply) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("mno", mno);
    formData.append("missingReplyText", missing.newReply);
    formData.append("missingReplyer", loginState.nickname);
    formData.append("star", missing.star);
    formData.append("email", loginState.email);

    setFetching(true);
    replyAdd(formData)
      .then(() => {
        setMissing((prevState) => ({
          ...prevState,
          replies: [
            ...prevState.replies,
            {
              text: missing.newReply,
              replyer: loginState.nickname,
              star: missing.star,
              email: loginState.email,
            },
          ],
          newReply: "",
        }));
      })
      .catch((error) => console.error("리포트 등록 중 오류 발생:", error))
      .finally(() => setFetching(false));
  };

  return (
    <div className="w-full border-2 border-gray-300 mt-4 mx-8 p-4 rounded-lg shadow-lg">
      {fetching ? <FetchingModal /> : null}
      <div className="flex justify-between space-x-8">
        <div className="w-1/2 p-2" ref={imageContainerRef}>
          {missing.uploadFileNames.map((imgFile, index) => (
            <img
              alt="missing"
              key={index}
              className="object-cover h-full w-full rounded"
              src={`${API_SERVER_HOST}/api/missing/view/${imgFile}`}
            />
          ))}
        </div>
        <div
          className="w-1/2 flex flex-col justify-center"
          ref={infoContainerRef}
        >
          <div className="bg-white p-4 rounded shadow relative">
            <h3 className="text-2xl font-bold text-center">상세 정보</h3>
            <p className="text-xl">이름: {missing.mname}</p>
            <p className="text-xl">나이: {missing.age}살</p>
            <p className="text-xl">성별: {missing.gender}</p>
            <p className="text-xl">특징: {missing.description}</p>
            <div className="text-center text-xl mt-2">실종위치</div>
            <div
              ref={mapContainer}
              style={{ height: "300px" }}
              className="rounded shadow-lg mt-4 relative"
            ></div>
          </div>
        </div>
      </div>
      <ReportListComponent mno={mno} />
      {isLogin ? (
        <div className="mt-4 flex justify-end">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="제보 내용을 입력하세요"
            value={missing.newReply}
            onChange={(e) =>
              setMissing({ ...missing, newReply: e.target.value })
            }
          />
          <button
            className="ml-4 p-2 text-white rounded bg-emerald-500 hover:bg-emerald-700"
            style={{ whiteSpace: "nowrap" }}
            onClick={addReply}
          >
            제보하기
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-end">
          <div
            className="w-full p-2 border rounded bg-gray-200 cursor-pointer"
            onClick={loginHandler}
          >
            로그인 후 이용이 가능합니다.
          </div>
          <button
            className="ml-4 p-2 text-white rounded bg-emerald-500 hover:bg-emerald-700"
            style={{ whiteSpace: "nowrap" }}
            onClick={loginHandler}
          >
            제보하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MissingReadComponent;
