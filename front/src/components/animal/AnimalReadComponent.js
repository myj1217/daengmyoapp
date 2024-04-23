import { useEffect, useState } from "react";
import { getOne } from "../../api/animalApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { useNavigate } from "react-router-dom";

const initState = {
  ano: 0,
  aname: "",
  gender: "",
  age: 0,
  features: "", // 동물의 특징을 추가
  uploadFileNames: [],
  adoptionAgency: {
    address: "가상 주소",
    phone: "010-1234-5678",
    email: "contact@example.com",
  },
};

const host = API_SERVER_HOST;

const AnimalReadComponent = ({ ano }) => {
  const [animal, setAnimal] = useState(initState);
  const { moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);

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
    <div className="w-full border-2 border-gray-300 mt-4 mx-2 p-4">
      {fetching ? <FetchingModal /> : null}
      <div className="flex">
        <div className="w-1/2">
          {animal.uploadFileNames.map((imgFile, i) => (
            <img
              alt="animal"
              key={i}
              style={{ width: "600px", height: "600px" }}
              className="object-cover"
              src={`${host}/api/animal/view/${imgFile}`}
            />
          ))}
        </div>
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-2 font-bold">이름: {animal.aname}</div>
            <div className="text-xl mb-2">
              나이: {animal.age.toLocaleString("ko-KR")}살
            </div>
            <div className="text-lg mb-2">성별: {animal.gender}</div>
            <div className="text-3xl mb-2 font-bold">특징: {animal.notes}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="text-lg font-semibold mb-2">입양 기관 정보:</div>
            <div className="text-md">주소: {animal.adoptionAgency.address}</div>
            <div className="text-md">
              전화번호: {animal.adoptionAgency.phone}
            </div>
            <div className="text-md">이메일: {animal.adoptionAgency.email}</div>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <button
              type="button"
              className="rounded bg-gray-800 text-white p-4 hover:bg-gray-600"
              onClick={() => moveToModify(ano)}
            >
              정보 수정
            </button>
            <button
              type="button"
              className="rounded bg-gray-800 text-white p-4 hover:bg-gray-600"
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
