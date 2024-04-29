import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOne } from "../../api/animalApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const initState = {
  ano: 0,
  aname: "",
  gender: "",
  age: 0,
  notes: "",
  uploadFileNames: [],
  adoptionAgency: {
    address: "서울특별시 용산구 후암로 51 (후암동) 1층",
    phone: "02-778-7582",
    email: "contact@example.com",
  },
};

const AnimalReadComponent = ({ ano }) => {
  const [animal, setAnimal] = useState(initState);
  const { moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const { isAdmin } = useCustomLogin();
  const navigate = useNavigate();

  useEffect(() => {
    setFetching(true);
    getOne(ano).then((data) => {
      setAnimal({ ...initState, ...data });
      setFetching(false);
    });
  }, [ano]);

  const handleClickList = () => {
    navigate("/animal/list");
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-6 border-2 border-gray-300 shadow-lg">
      {fetching ? <FetchingModal /> : null}
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 p-4">
          {animal.uploadFileNames.map((imgFile, index) => (
            <img
              key={index}
              alt="animal"
              className="w-full h-auto object-cover rounded-lg shadow"
              src={`${host}/api/animal/view/${imgFile}`}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-4xl font-bold mb-3">이름: {animal.aname}</h1>
            <p className="text-2xl mb-2">나이: {animal.age}살</p>
            <p className="text-xl mb-2">성별: {animal.gender}</p>
            <p className="text-xl mb-2">특징: {animal.notes}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-2">입양 기관 정보:</h2>
            <p className="text-lg mb-1">
              주소: {animal.adoptionAgency.address}
            </p>
            <p className="text-lg mb-1">
              전화번호: {animal.adoptionAgency.phone}
            </p>
            <p className="text-lg">이메일: {animal.adoptionAgency.email}</p>
          </div>
          <div>
            {isAdmin && (
              <button
                className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                onClick={() => moveToModify(ano)}
              >
                정보 수정
              </button>
            )}
            <button
              className="w-full py-3 mt-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors duration-300 ease-in-out"
              onClick={handleClickList}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalReadComponent;
