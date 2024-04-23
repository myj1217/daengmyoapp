import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/animalApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  ano: 0,
  aname: "",
  gender: "",
  notes: "",
  age: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const AnimalModifyComponent = ({ ano }) => {
  const [animal, setAnimal] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);

    getOne(ano).then((data) => {
      setAnimal(data);
      setFetching(false);
    });
  }, [ano]);

  const handleChangeAnimal = (e) => {
    animal[e.target.name] = e.target.value;

    setAnimal({ ...animal });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = animal.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    animal.uploadFileNames = resultFileNames;

    setAnimal({ ...animal });
  };

  // 수정완료
  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 다른 데이터
    formData.append("aname", animal.aname);
    formData.append("gender", animal.gender);
    formData.append("notes", animal.notes);
    formData.append("age", animal.age);
    formData.append("delFlag", animal.delFlag);

    for (let i = 0; i < animal.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", animal.uploadFileNames[i]);
    }

    // 데이터 요청
    setFetching(true);

    putOne(ano, formData).then((data) => {
      // 수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };

  // 삭제
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(ano).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(ano);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }

    setResult(null);
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">동물명</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="aname"
            type={"text"}
            value={animal.aname}
            onChange={handleChangeAnimal}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">성별</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="gender"
            type={"text"}
            value={animal.gender}
            onChange={handleChangeAnimal}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">특징</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="notes"
            type={"text"}
            value={animal.notes}
            onChange={handleChangeAnimal}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">나이</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="age"
            type={"number"}
            value={animal.age}
            onChange={handleChangeAnimal}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {animal.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-red-500 text-lg text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  해당 이미지 삭제
                </button>
                <img alt="img" src={`${host}/api/animal/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-gray-800"
          onClick={handleClickModify}
        >
          수정완료
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-gray-800"
          onClick={handleClickDelete}
        >
          삭제
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-gray-800"
          onClick={() => moveToList({ page: 1 })}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default AnimalModifyComponent;
