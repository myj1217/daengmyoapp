import React, { useEffect, useRef, useState } from "react";
// import loopy from "../../asset/images/loopy.jpg";
import { getList } from "../../api/missingApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";

const host = API_SERVER_HOST;

// const lostPets = [
//   {
//     id: 1,
//     name: "루피",
//     age: "3",
//     gender: "수컷",
//     image: loopy,
//     details: "마지막으로 서울 강남구에서 발견되었습니다.",
//     lat: 37.4979,
//     lng: 127.0276,
//   },
// ];

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const MapComponent = ({ lat, lng }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const center = new window.kakao.maps.LatLng(lat, lng);
      const mapOption = {
        center: center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
      const marker = new window.kakao.maps.Marker({ position: center });
      marker.setMap(map);
    } else {
      console.error("Kakao map script not loaded");
    }
  }, [lat, lng]);

  return <div ref={mapContainer} style={{ width: "95%", height: "95%" }} />;
};

const MissingPet = () => {
  const handleReportSighting = () => console.log("Sighting reported!");
  const [serverData, setServerData] = useState(initState);
  const { exceptionHandle } = useCustomLogin();
  const { moveToMissingRead } = useCustomMove();

  useEffect(() => {
    const fetchData = async () => {
      const pageParam = { page: 1, size: 1 };
      try {
        const data = await getList(pageParam);
        setServerData(data);
      } catch (err) {
        exceptionHandle(err); // 여기서 에러를 처리합니다.
        alert("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.");
      }
    };

    fetchData();
  }, []); // 의존성 배열에서 exceptionHandle 제거

  return (
    <div className="flex h-screen mx-8 my-4">
      {serverData.dtoList && serverData.dtoList.length > 0 ? (
        <>
          <div
            className="w-1/2 bg-white ml-4 rounded-br-lg overflow-hidden"
            style={{ height: "100%" }}
          >
            {serverData.dtoList.map((missing) => (
              <MapComponent
                key={missing.mno}
                lat={missing.latitude}
                lng={missing.longitude}
              />
            ))}
          </div>
          <div
            className="w-1/2 bg-white p-4 overflow-hidden"
            style={{ height: "100%" }}
          >
            <div className="grid grid-cols-1 gap-1">
              {/* <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1"> */}
              {serverData.dtoList.map((missing) => (
                <div
                  key={missing.mno}
                  className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => moveToMissingRead(missing.mno)}
                >
                  <img
                    alt="missing"
                    className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
                    src={`${host}/api/missing/view/s_${missing.uploadFileNames[0]}`}
                  />

                  <div className="bottom-0 bg-white text-lg p-4">
                    <div className="text-center p-1">{missing.mname}</div>
                    <div className="text-center p-1 font-extrabold">
                      {missing.age.toLocaleString("ko-KR")}살
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="my-10 text-4xl">
          실종신고 리스트를 불러올 수 없습니다.
        </div>
      )}
    </div>
  );
};

export default MissingPet;
