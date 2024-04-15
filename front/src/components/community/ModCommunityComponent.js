import { useEffect, useRef, useState } from "react";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import {
  delCommunity,
  getCommunity,
  modCommunity,
} from "../../api/communityApi";
import { API_SERVER_HOST } from "../../api/rootApi";

const initState = {
  communityBno: 0,
  communityTitle: "",
  communityContent: "",
  communityWriter: "",
  uploadFileNames: [],
};

const ModCommunityComponent = ({ communityBno }) => {
  const [community, setCommunity] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);
    getCommunity(communityBno).then((data) => {
      setCommunity(data);
      setFetching(false);
    });
  }, [communityBno]);

  const handleChangeCommunity = (e) => {
    community[e.target.name] = e.target.value;

    setCommunity({ ...community });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = community.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    community.uploadFileNames = resultFileNames;

    setCommunity({ ...community });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("communityTitle", community.communityTitle);
    formData.append("communityContent", community.communityContent);

    for (let i = 0; i < community.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", community.uploadFileNames[i]);
    }

    setFetching(true);
    modCommunity(communityBno, formData).then(() => {
      setResult("Modified");
      setFetching(false);
      console.log(community);
    });
  };

  const handleClickDelete = () => {
    setFetching(true);
    delCommunity(communityBno).then(() => {
      setResult("Deleted");
      setFetching(false);
    });
  };
  const handleDeleteImage = (imageName) => {
    // 이미지 삭제 기능 추가
    setCommunity({
      ...community,
      uploadFileNames: community.uploadFileNames.filter(
        (name) => name !== imageName
      ),
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(communityBno);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }

    setResult(null);
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title={`${result === "Modified" ? "수정 완료" : "삭제 완료"}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      )}

      {/* Form content here */}
      <div className="flex justify-center space-y-4 flex-col">
        <div className="flex justify-between items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="communityTitle"
          >
            제목
          </label>
          <input
            id="communityTitle"
            name="communityTitle"
            type="text"
            value={community.communityTitle}
            onChange={handleChangeCommunity}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="communityContent"
          >
            내용
          </label>
          <input
            id="communityContent"
            name="communityContent"
            type="text"
            value={community.communityContent}
            onChange={handleChangeCommunity}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="communityWriter"
          >
            작성자
          </label>
          <input
            id="communityWriter"
            name="communityWriter"
            type="text"
            value={community.communityWriter}
            // onChange={handleChangeCommunity}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* More inputs similar to the above */}
        <div>
          <label htmlFor="files">파일 수정:</label>
          <input type="file" id="files" name="files" ref={uploadRef} multiple />
        </div>

        <div>
          {/* 이미지 삭제 기능 추가 */}
          {community.uploadFileNames.map((imageName) => (
            <div key={imageName}>
              <img
                src={`${API_SERVER_HOST}/community/file/${imageName}`}
                alt={imageName}
                className="w-32 h-32 object-cover"
              />
              <button onClick={() => handleDeleteImage(imageName)}>
                이미지 삭제
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClickModify}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            수정완료
          </button>
          <button
            onClick={handleClickDelete}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            삭제
          </button>
          <button
            onClick={() => moveToList({ page: 1 })}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModCommunityComponent;
