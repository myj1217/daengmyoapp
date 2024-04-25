import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../api/missingApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { useNavigate } from "react-router-dom";

const initState = {
  mno: 0,
  mname: "",
  gender: "",
  age: 0,
  description: "",
  uploadFileNames: [],
  latitude: null,
  longitude: null,
};

const host = API_SERVER_HOST;

const MissingReadComponent = ({ mno }) => {
  const [missing, setMissing] = useState(initState);
  const { moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const mapContainer = useRef(null);

  useEffect(() => {
    setFetching(true);
    getOne(mno).then((data) => {
      setMissing({ ...initState, ...data });
      setFetching(false);
    });
  }, [mno]);

  useEffect(() => {
    if (missing.latitude && missing.longitude) {
      const center = new window.kakao.maps.LatLng(
        missing.latitude,
        missing.longitude
      );
      const options = {
        center: center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      new window.kakao.maps.Marker({
        position: center,
        map: map,
      });
    }
  }, [missing.latitude, missing.longitude]);

  const handleClickList = () => {
    navigate("/missing/list");
  };

  return (
    <div className="w-full border-2 border-gray-300 mt-4 mx-8 p-4 rounded-lg shadow-lg">
      {fetching ? <FetchingModal /> : null}
      <div className="flex justify-between space-x-8">
        <div className="w-1/2 p-2">
          {missing.uploadFileNames.map((imgFile, i) => (
            <img
              alt="missing"
              key={i}
              className="object-cover h-full w-full rounded"
              src={`${host}/api/missing/view/${imgFile}`}
            />
          ))}
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <div className="bg-white p-4 rounded shadow ">
            <h3 className="text-2xl font-bold text-center">상세 정보</h3>
            <p className="text-xl">이름: {missing.mname}</p>
            <p className="text-xl">나이: {missing.age}살</p>
            <p className="text-xl">성별: {missing.gender}</p>
            <p className="text-xl">특징: {missing.description}</p>
          </div>
          <div
            ref={mapContainer}
            style={{ height: "300px" }}
            className="rounded shadow-lg mt-4"
          ></div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600"
          onClick={() => moveToModify(mno)}
        >
          정보 수정
        </button>
        <button
          type="button"
          className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600"
          onClick={handleClickList}
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default MissingReadComponent;
