import { useEffect, useRef, useState } from "react";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { delNotice, getNotice, modNotice } from "../../api/noticeApi";
import { API_SERVER_HOST } from "../../api/rootApi";
import { Navigate, useNavigate } from "react-router-dom";

const initState = {
  noticeBno: 0,
  noticeTitle: "",
  noticeContent: "",
  noticeWriter: "",
  delFlag: false,
  uploadFileNames: [],
};

const ModNoticeComponent = ({ noticeBno }) => {
  const [notice, setNotice] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToRead, moveToList } = useCustomMove();
  const navigate = useNavigate(); // useNavigate 훅 추가

  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    setFetching(true);
    getNotice(noticeBno).then((data) => {
      setNotice(data);
      setFetching(false);
    });
  }, [noticeBno]);

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;

    setNotice({ ...notice });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = notice.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    notice.uploadFileNames = resultFileNames;

    setNotice({ ...notice });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("noticeTitle", notice.noticeTitle);
    formData.append("noticeContent", notice.noticeContent);
    formData.append("delFlag", notice.delFlag);

    for (let i = 0; i < notice.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", notice.uploadFileNames[i]);
    }

    setFetching(true);
    modNotice(noticeBno, formData).then(() => {
      setResult("Modified");
      setFetching(false);
      console.log(notice);
    });
  };

  const handleClickDelete = () => {
    setFetching(true);
    delNotice(noticeBno).then(() => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(noticeBno);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }

    setResult(null);
  };
  const handleClickList = () => {
    navigate("/notice/list");
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
            htmlFor="noticeTitle"
          >
            제목
          </label>
          <input
            name="noticeTitle"
            type={"text"}
            value={notice.noticeTitle}
            onChange={handleChangeNotice}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="noticeContent"
          >
            내용
          </label>
          <input
            name="noticeContent"
            type={"text"}
            value={notice.noticeContent}
            onChange={handleChangeNotice}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between items-center">
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="noticeWriter"
          >
            작성자
          </label>
          <input
            name="noticeWriter"
            type={"text"}
            value={notice.noticeWriter}
            // onChange={handleChangenotice}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> */}
        </div>

        {/* More inputs similar to the above */}
        <div>
          <label htmlFor="files">파일 수정:</label>
          <input type={"file"} name="files" ref={uploadRef} multiple={true} />
        </div>

        <div>
          {/* 이미지 삭제 기능 추가 */}
          {notice.uploadFileNames.map((imageName) => (
            <div key={imageName}>
              <img
                src={`${API_SERVER_HOST}/notice/view/${imageName}`}
                alt={imageName}
                className="w-32 h-32 object-cover"
              />
              <button onClick={() => deleteOldImages(imageName)}>
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
            onClick={handleClickList}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModNoticeComponent;
