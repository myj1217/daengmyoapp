import { useRef, useState } from "react";
import { postAdd } from "../../api/animalApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initState = {
  aname: "",
  gender: "",
  notes: "",
  age: "",
  files: [],
};

const AnimalAddComponent = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({ ...initState });
  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();

  const handleChangeAnimal = (e) => {
    animal[e.target.name] = e.target.value;
    setAnimal({ ...animal });
  };

  const handleClickAdd = async (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("aname", animal.aname);
    formData.append("gender", animal.gender);
    formData.append("age", animal.age);
    formData.append("notes", animal.notes);

    setFetching(true);

    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const handleClickList = () => {
    navigate({ pathname: "../" });
  };

  const closeModal = () => {
    setResult(null);
    navigate({ page: "../" });
  };

  return (
    <div className="max-w-4xl mx-auto border-2 border-gray-300 mt-10 rounded-lg p-8 shadow-lg">
      {fetching ? <FetchingModal /> : null}
      {result && (
        <ResultModal
          title={"Adoption Entry Added"}
          content={"The entry has been successfully registered."}
          callbackFn={closeModal}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="text-right font-bold w-1/3 px-2">이름:</label>
          <input
            className="form-input w-2/3"
            name="aname"
            type="text"
            value={animal.aname}
            onChange={handleChangeAnimal}
          />
        </div>
        <div className="flex items-center">
          <label className="text-right font-bold w-1/3 px-2">성별:</label>
          <input
            className="form-input w-2/3"
            name="gender"
            type="text"
            value={animal.gender}
            onChange={handleChangeAnimal}
          />
        </div>
        <div className="flex items-center">
          <label className="text-right font-bold w-1/3 px-2">특징:</label>
          <input
            className="form-input w-2/3"
            name="notes"
            type="text"
            value={animal.notes}
            onChange={handleChangeAnimal}
          />
        </div>
        <div className="flex items-center">
          <label className="text-right font-bold w-1/3 px-2">나이:</label>
          <input
            className="form-input w-2/3"
            name="age"
            type="number"
            value={animal.age}
            onChange={handleChangeAnimal}
          />
        </div>
        <div className="flex items-center col-span-2">
          <label className="text-right font-bold w-1/6 px-2">Files:</label>
          <input
            ref={uploadRef}
            className="form-input w-5/6"
            type="file"
            multiple={true}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          className="btn bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-700"
          onClick={handleClickAdd}
        >
          추가하기
        </button>
        <button
          type="button"
          className="btn bg-gray-500 text-white px-6 py-3 rounded shadow hover:bg-gray-400"
          onClick={handleClickList}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default AnimalAddComponent;
