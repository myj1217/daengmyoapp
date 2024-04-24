import React, { useState, useEffect, useRef } from "react";
import { postAdd } from "../../api/missingApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom";

const MissingPetReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    description: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const marker = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const center = new window.kakao.maps.LatLng(37.5665, 126.978);
    const options = {
      center: center,
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);

    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;

      setFormData((formData) => ({
        ...formData,
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
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
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Array.from(formData.images).forEach((image) => {
      formDataToSend.append("images", image);
    });

    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", formData.latitude.toString());
    formDataToSend.append("longitude", formData.longitude.toString());

    setFetching(true);
    try {
      const response = await postAdd(formDataToSend);
      setResult(response.data);
      setFetching(false);

      if (response.data.success) {
        alert("Report submitted successfully");
        navigate("/");
      } else {
        alert("Failed to submit report");
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to connect to the server: " + error.message,
      });
      setFetching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg bg-white">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title="Report Status"
          content={result.message}
          callbackFn={() => setResult(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold text-gray-700">
              이름:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
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
              value={formData.age}
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
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">성별</option>
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
              value={formData.description}
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
            ref={fileInputRef}
            multiple
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <h2>실종위치</h2>
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
    </div>
  );
};

export default MissingPetReport;
