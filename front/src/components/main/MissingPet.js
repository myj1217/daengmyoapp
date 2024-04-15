import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import loopy from "../../asset/images/loopy.jpg";

const lostPets = [
  {
    id: 1,
    name: "루피",
    age: "3",
    gender: "수컷",
    image: loopy,
    details: "마지막으로 서울 강남구에서 발견되었습니다.",
  },
];

const containerStyle = {
  width: "95%",
  height: "95%",
};

const center = {
  lat: 37.4979,
  lng: 127.0276,
};

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAIGX6HrHtDewguKt0oJLSHMGENuIRSfFo" // API 키
      onLoad={() => setMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          mapTypeControl: true,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#523735" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f1e6" }],
            },
          ],
        }}
      >
        {mapLoaded && (
          <Marker
            position={center}
            icon={{
              url: loopy,
              scaledSize: new window.google.maps.Size(100, 100),
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

const MissingPet = () => {
  const handleReportSighting = () => {
    console.log("Sighting reported!");
  };

  return (
    <div className="flex h-screen mx-8 my-4">
      <div
        className="w-1/2 bg-white ml-4 rounded-br-lg overflow-hidden"
        style={{ height: "100%" }}
      >
        <MapComponent />
      </div>
      <div
        className="w-1/2 bg-white p-4 overflow-hidden"
        style={{ height: "100%" }}
      >
        {lostPets.map((pet) => (
          <div key={pet.id} className="mb-4 p-4 shadow-lg rounded-lg">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full object-cover rounded-t-lg mb-2"
              style={{ height: "64vh" }}
            />
            <div className="px-2">
              <h3 className="text-lg font-bold">이름: {pet.name}</h3>
              <h3 className="text-lg">나이: {pet.age}</h3>
              <h3 className="text-lg">성별: {pet.gender}</h3>
              <p className="text-lg">실종장소: {pet.details}</p>
              <div className="text-right">
                <button
                  onClick={handleReportSighting}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  목격 제보하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingPet;
