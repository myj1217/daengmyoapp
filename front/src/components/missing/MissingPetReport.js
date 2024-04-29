import React, { useState, useEffect, useRef } from "react";
import { postAdd } from "../../api/missingApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initState = {
  mname: "",
  age: "",
  gender: "",
  description: "",
  latitude: "",
  longitude: "",
  files: [],
};

const MissingPetReport = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();
  const [missing, setMissing] = useState({ ...initState });
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  const mapContainer = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    const center = new window.kakao.maps.LatLng(37.5665, 126.978);
    const options = {
      center: center,
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);

    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;

      setMissing((prevData) => ({
        ...prevData,
        latitude: latlng.getLat().toFixed(6),
        longitude: latlng.getLng().toFixed(6),
      }));

      if (marker.current) {
        marker.current.setPosition(latlng);
      } else {
        marker.current = new window.kakao.maps.Marker({
          position: latlng,
          map: map,
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    missing[e.target.name] = e.target.value;
    setMissing({ ...missing });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("mname", missing.mname);
    formData.append("age", missing.age);
    formData.append("gender", missing.gender);
    formData.append("description", missing.description);
    formData.append("latitude", missing.latitude.toString());
    formData.append("longitude", missing.longitude.toString());

    setFetching(true);
    await postAdd(formData);
    setFetching(false);
    setResult({ title: "성공", content: "신고가 정상적으로 접수되었습니다." });
  };

  const closeModal = () => {
    setResult(null);
    navigate("/missing/list");
  };

  return (
    <div className=" mx-auto p-4 my-2 shadow-lg rounded-lg bg-white">
      {fetching ? <FetchingModal /> : null}
      {result && (
        <ResultModal
          title={result.title}
          content={result.content}
          callbackFn={closeModal}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="mname" className="font-bold text-gray-700">
              이름:
            </label>
            <input
              type="text"
              name="mname"
              id="mname"
              value={missing.mname}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="font-bold text-gray-700">
              나이:
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={missing.age}
              min="0"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="font-bold text-gray-700">
              성별:
            </label>
            <select
              name="gender"
              id="gender"
              value={missing.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">성별 선택</option>
              <option value="male">수컷</option>
              <option value="female">암컷</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="description" className="font-bold text-gray-700">
              특징:
            </label>
            <textarea
              name="description"
              id="description"
              value={missing.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="images" className="font-bold text-gray-700">
            사진:
          </label>
          <input
            type="file"
            name="images"
            id="images"
            ref={uploadRef}
            multiple
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <h2 className="font-bold text-gray-700">실종위치:</h2>
        <div
          ref={mapContainer}
          style={{ width: "100%", height: "300px" }}
          className="mt-4"
        ></div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          신고하기
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/missing/list")}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          실종목록으로
        </button>
      </div>
    </div>
  );
};

export default MissingPetReport;
