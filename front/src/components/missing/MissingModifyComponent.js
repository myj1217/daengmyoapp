import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/missingApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/rootApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  mno: 0,
  mname: "",
  description: "",
  age: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const MissingModifyComponent = ({ mno }) => {
  const [missing, setMissing] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);

    getOne(mno).then((data) => {
      setMissing(data);
      setFetching(false);
    });
  }, [mno]);

  const handleChangeMissing = (e) => {
    missing[e.target.name] = e.target.value;

    setMissing({ ...missing });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = missing.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    missing.uploadFileNames = resultFileNames;

    setMissing({ ...missing });
  };

  // 수정완료
  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other data
    formData.append("mname", missing.mname);
    formData.append("description", missing.description);
    formData.append("age", missing.age);
    formData.append("delFlag", missing.delFlag);

    for (let i = 0; i < missing.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", missing.uploadFileNames[i]);
    }

    //fetching
    setFetching(true);

    putOne(mno, formData).then((data) => {
      //수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };

  // 삭제
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(mno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(mno);
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
          // title={`${result}`}
          title={"신고내역 수정"}
          content={"신고내역 수정이 완료되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이름</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="mname"
            type={"text"}
            value={missing.mname}
            onChange={handleChangeMissing}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">특징</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="description"
            rows="4"
            onChange={handleChangeMissing}
            value={missing.description}
          >
            {missing.description}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">나이</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="age"
            type={"number"}
            value={missing.age}
            onChange={handleChangeMissing}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">사진</div>
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
            {missing.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-red-500 text-lg text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  해당 이미지 삭제
                </button>
                <img alt="img" src={`${host}/api/missing/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-gray-800"
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
          onClick={moveToList}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default MissingModifyComponent;
