import React, { useState, useEffect } from "react";
import { API_SERVER_HOST } from "../../api/rootApi";
import PageComponent from "../common/PageComponent";
import { getList } from "../../api/animalApi";
import useCustomMove from "../../hooks/useCustomMove";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const AnimalSearchComponent = () => {
  const { page, size, refresh } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [region, setRegion] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [gender, setGender] = useState("");
  const [keyword, setKeyword] = useState("");
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList({ page, size });
        setServerData(data);
      } catch (err) {
        alert("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.");
      }
    };

    fetchData();
  }, [page, size, refresh]);

  const filterAnimals = () => {
    let results = animals;
    if (vaccinationStatus) {
      results = results.filter(
        (animal) => animal.vaccinated === vaccinationStatus
      );
    }
    if (region) {
      results = results.filter((animal) => animal.region === region);
    }
    if (animalType) {
      results = results.filter((animal) => animal.type === animalType);
    }
    if (gender) {
      results = results.filter((animal) => animal.gender === gender);
    }
    if (keyword) {
      results = results.filter((animal) =>
        animal.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setFilteredAnimals(results);
  };
  // 폼 제출 이벤트를 처리합니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    filterAnimals();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full mx-auto my-6 p-6 shadow-lg rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 예방접종 여부 선택 필드 */}
          <div className="flex flex-col">
            <label
              htmlFor="vaccinationStatus"
              className="text-sm font-medium text-gray-700"
            >
              예방접종 여부:
            </label>
            <select
              id="vaccinationStatus"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={vaccinationStatus}
              onChange={(e) => setVaccinationStatus(e.target.value)}
            >
              <option value="">전체</option>
              <option value="yes">예방접종 완료</option>
              <option value="no">미접종</option>
            </select>
          </div>

          {/* 지역 선택 필드 */}
          <div className="flex flex-col">
            <label
              htmlFor="region"
              className="text-sm font-medium text-gray-700"
            >
              지역:
            </label>
            <select
              id="region"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">전체</option>
              <option value="seoul">서울특별시</option>
              {/* 추가 지역 옵션 */}
            </select>
          </div>

          {/* 동물 타입 선택 필드 */}
          <div className="flex flex-col">
            <label
              htmlFor="animalType"
              className="text-sm font-medium text-gray-700"
            >
              동물종류:
            </label>
            <select
              id="animalType"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
            >
              <option value="">전체</option>
              <option value="dog">개</option>
              <option value="cat">고양이</option>
            </select>
          </div>

          {/* 성별 선택 필드 */}
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700"
            >
              성별:
            </label>
            <select
              id="gender"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">전체</option>
              <option value="male">수컷</option>
              <option value="female">암컷</option>
            </select>
          </div>

          {/* 검색창 필드 */}
          <div className="flex flex-col col-span-3">
            <label
              htmlFor="keyword"
              className="text-sm font-medium text-gray-700"
            >
              검색:
            </label>
            <input
              id="keyword"
              type="text"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="검색어 입력..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* 조회 버튼 */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            조회
          </button>
        </div>
      </form>
      <ul>
        {filteredAnimals.map((animal) => (
          <li
            key={animal.ano}
          >{`${animal.aname} (${animal.type}, ${animal.gender}, ${animal.region}, Vaccinated: ${animal.vaccinated})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalSearchComponent;
